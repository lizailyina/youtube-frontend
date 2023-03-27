import axios from "axios";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {

  const [loginName, setLoginName] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");

  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("auth/signin", { name: loginName, password: loginPassword });
      console.log(data);
    } catch (err) {
      console.log(err);
      alert("Login failed, check your login and password")
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("auth/signup", { name, email, password });
      console.log(data);
    } catch (err) {
      console.log(err);
      alert("SignUp failed, email and name must be unique")
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to NewTube</SubTitle>
        <Input value={loginName} onChange={(e) => setLoginName(e.target.value)} placeholder="username" />
        <Input value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} type="password" placeholder="password" />
        <Button onClick={handleSignIn}>Sign in</Button>
        <Title>or</Title>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="username" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
        <Button onClick={handleSignUp}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
