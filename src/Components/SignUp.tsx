import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../Images/logo.svg";
import { LogIn } from "../types/data-type";

function SignUp({
  setIsLogin,
  handleeSubmit,
  email,
  setEmail,
  password,
  setPassword,
  error,
}: LogIn) {
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState<string>("");
  const [imageErr, setImageErr] = useState("");

  const navigate = useNavigate();
  const handleChange = (e: any) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let isValid = true;
    if (email === "") {
      setEmailErr("Can’t be empty");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailErr("Invalid email format");
      isValid = false;
    } else {
      setEmailErr("");
    }

    //Password checker
    if (password === "") {
      setPasswordErr("Can’t be empty");
      isValid = false;
    } else if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      setPasswordErr(
        "Password should be at least 8 characters long, and contain at least one uppercase letter and one number"
      );
      isValid = false;
    } else {
      setPasswordErr("");
    }

    //Confirm password checker
    if (!confirmPassword) {
      setConfirmPasswordErr("Confirm Password cannot be empty");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordErr("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordErr("");
    }

    //Image checker
    if (image === "") {
      setImageErr("Please upload an image");
      isValid = false;
    } else {
      setImageErr("");
    }

    if (isValid) {
      const formData = new FormData();
      formData.append("avatar", image);
      formData.append("email", email);
      formData.append("password", password);
      try {
        const res = await axios.post(
          "https://entertainment-web-2qzi.onrender.com/api/auth/signup",
          formData
        );
        setIsLogin(true);
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <MainContainer>
      <LogoContainer>
        <img src={Logo} />
      </LogoContainer>
      <LoginContainer>
        <LoginText>Sign Up</LoginText>
        <InputsContainer>
          <form onSubmit={handleeSubmit}>
            <Input
              placeholder="Email address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>{emailErr && emailErr}</span>

            <Input
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>{passwordErr && passwordErr}</span>

            <Input
              placeholder="Repeat Password"
              name="repeatpassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span>{confirmPasswordErr && confirmPasswordErr}</span>

            <Input
              placeholder="Avatar"
              name="Avatar"
              type="file"
              onChange={(e) => handleChange(e)}
            />
            <span>{imageErr && imageErr}</span>

            <LoginButton type="submit" onClick={(e) => handleSubmit(e)}>
              Create an account
            </LoginButton>
          </form>
        </InputsContainer>

        <LoginFooterText>
          <p>Already have an account?</p>
          <LoginLink to="/">Login</LoginLink>
        </LoginFooterText>
      </LoginContainer>
    </MainContainer>
  );
}

export default SignUp;

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
  padding-top: 10px;
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
  color: white;
  &:last-child {
    padding-top: 24px;
  }
  &:hover {
    border-bottom: 1px solid #ffffff;
    color: #ffffff;
    opacity: 1;
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

const LoginLink = styled(Link)`
  font-weight: 300;
  font-size: 15px;
  color: #fc4747;
  text-decoration: none;
`;
