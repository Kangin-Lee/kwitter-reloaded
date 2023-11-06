import styled from "styled-components";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
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

// const errors = {
//   "auth/email-already-in-use": "이미 사용 중인 이메일입니다.",
// };

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);

      await updateProfile(credentials.user, {
        displayName: name,
      });
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
        Join <FontAwesomeIcon icon={faXTwitter} />
      </Title>
      <Form onSubmit={onSubmit}>
        <FormItem>
          <FontAwesomeIcon
            icon={faUser}
            style={{ color: "black", marginRight: "10px", fontSize: "20px" }}
          />
          <Input
            onChange={onChange}
            name="name"
            value={name}
            placeholder="이름을 입력하세요"
            type="text"
            required
          />
        </FormItem>

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
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        이미 아이디가 존재하나요?
        <Link to="/login">로그인하기 &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
