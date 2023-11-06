import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Error,
  FormItem,
  Input,
  Switcher,
  Title,
  Wrapper,
  Form,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Title>
        Login to <FontAwesomeIcon icon={faXTwitter} />
      </Title>
      <Form onSubmit={onSubmit}>
        <FormItem>
          <FontAwesomeIcon
            icon={faEnvelope}
            style={{ color: "black", marginRight: "10px", fontSize: "20px" }}
          />
          <Input
            onChange={onChange}
            name="email"
            value={email}
            placeholder="이메일을 입력하세요"
            type="email"
            required
          />
        </FormItem>

        <FormItem>
          <FontAwesomeIcon
            icon={faLock}
            style={{ color: "black", marginRight: "10px", fontSize: "20px" }}
          />
          <Input
            onChange={onChange}
            value={password}
            name="password"
            placeholder="비밀번호를 입력하세요"
            type="password"
            required
          />
        </FormItem>
        <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        아직 계정이 없으신가요?
        <Link to="/create-account">회원가입 하기 &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
