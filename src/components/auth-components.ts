import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0;
`;
export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
export const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 16px;
  outline: none;
  padding: 10px 0;
  &[type="submit"] {
    cursor: pointer;
    transition: 0.5s;
    padding: 10px 20px;
    border-radius: 50px;
    background-color: #1d9bf0;
    color: white;
    &:hover {
      opacity: 0.8;
      transition: 0.5s;
    }
  }
`;
export const Title = styled.h1`
  font-size: 50px;
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const FormItem = styled.div`
  display: flex;
  background-color: white;
  align-items: center;
  padding: 0 20px;
  border-radius: 50px;
`;
export const Switcher = styled.span`
  margin-top: 10px;
  a {
    color: #1d9bf0;
    margin-left: 5px;
  }
`;
