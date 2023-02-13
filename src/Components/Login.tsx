import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../Images/logo.svg";
import { LogIn } from "../types/data-type";

function Login({
  setIsLogin,
  handleeSubmit,
  email,
  setEmail,
  password,
  setPassword,
  error,
}: LogIn) {
  return (
    <MainContainer>
      <LogoContainer>
        <img src={Logo} />
      </LogoContainer>
      <LoginContainer>
        <LoginText>Login</LoginText>
        <InputsContainer>
          <form onSubmit={handleeSubmit}>
            <Input
              placeholder="Email address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>{error && error}</span>

            <Input
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>{error && error}</span>

            <LoginButton type="submit">Login to your account</LoginButton>
          </form>
        </InputsContainer>

        <LoginFooterText>
          <p>Don't have an account?</p>
          <SignUp>Sign Up</SignUp>
        </LoginFooterText>
      </LoginContainer>
    </MainContainer>
  );
}

export default Login;

const MainContainer = styled.div`
  padding-left: 24px;
  padding-right: 24px;

  @media (min-width: 768px) {
    padding-top: 80px;
    padding-left: 184px;
    padding-right: 184px;
    padding-bottom: 473px;
  }
  @media (min-width: 1440px) {
    padding-top: 187px;
    padding-left: 520px;
    padding-right: 520px;
    padding-bottom: 250px;
  }
`;

const LogoContainer = styled.div`
  margin: auto;
  width: 10%;
  padding-top: 48px;
  padding-bottom: 58px;
  text-align: center;
  @media (min-width: 768px) {
    padding-top: 0px;
  }
  @media (min-width: 1440px) {
    padding-bottom: 83px;
  }
`;

const LoginContainer = styled.div`
  margin: auto;
  padding-top: 24px;
  padding-bottom: 32px;
  background: #161d2f;
  border-radius: 10px;
  font-weight: 300;
  font-size: 15px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  @media (min-width: 768px) {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`;

const LoginText = styled.h1`
  font-size: 32px;
  padding-bottom: 40px;
  text-align: left;
  padding-left: 24px;
  letter-spacing: -0.5px;
  @media (min-width: 768px) {
    padding-left: 32px;
  }
`;

const InputsContainer = styled.div`
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  @media (min-width: 768px) {
    padding-left: 32px;
    padding-right: 32px;
  }
  @media (min-width: 1440px) {
    padding-left: 48px;
    padding-right: 48px;
  }
`;

const Input = styled.input`
  border: none;
  width: 100%;
  background-color: #161d2f;
  border-bottom: 1px solid #5a698f;
  padding: 17px;
  mix-blend-mode: normal;
  opacity: 0.5;
  &:last-child {
    padding-top: 24px;
  }
  &:hover {
    border-bottom: 1px solid #ffffff;
    color: #ffffff;
    opacity: 0.8;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

const LoginButton = styled.button`
  padding: 14px 68px;
  margin-bottom: 24px;
  margin-top: 40px;
  background: #fc4747;
  border-radius: 6px;
  border: none;
  &:hover {
    background: #ffffff;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    width: 100%;
    font-size: 15px;
  }
`;

const LoginFooterText = styled.div`
  display: flex;
  justify-content: center;
  gap: 9px;
`;

const SignUp = styled.p`
  color: #fc4747;
`;
