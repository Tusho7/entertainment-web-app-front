import styled, { StyledComponentProps } from "styled-components";
import Logo from "../Images/logo.svg";
import HomeLogo from "../Images/icon-nav-home.svg";
import MoviesLogo from "../Images/icon-nav-movies.svg";
import TvseriesLogo from "../Images/icon-nav-tv-series.svg";
import BookmarkLogo from "../Images/icon-nav-bookmark.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { LogIn } from "../types/data-type";

interface NavigationContainerProps
  extends StyledComponentProps<"div", any, { activePage: string }, never> {}

function Header({
  setIsLogin,
  handleeSubmit,
  email,
  setEmail,
  password,
  setPassword,
  error,
  user,
}: LogIn) {
  const navigate = useNavigate();

  const navHandler = (navText: string) => {
    if (navText === navText) {
      navigate(`/${navText}`);
    }
  };

  const buttonHandler = () => {
    setIsLogin(false);
    navigate("/");
  };

  const location = useLocation();

  return (
    <div>
      <NavigationContainer activePage={location.pathname.slice(1)}>
        <div>
          <Logoo src={Logo} />
        </div>

        <Navigationdiv>
          <Img onClick={() => navHandler("home")} src={HomeLogo} />
          <Img onClick={() => navHandler("movies")} src={MoviesLogo} />
          <Img onClick={() => navHandler("tvseries")} src={TvseriesLogo} />
          <Img onClick={() => navHandler("bookmark")} src={BookmarkLogo} />
        </Navigationdiv>

        <LogoutDiv>
          <p onClick={buttonHandler}>Logout</p>
          <AvatarImg
            alt=""
            src={process.env.REACT_APP_SERVER_URL + user.avatar}
          />
        </LogoutDiv>
      </NavigationContainer>
    </div>
  );
}

export default Header;

const NavigationContainer = styled.div<NavigationContainerProps>`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  padding: 18px 16px;
  background: #161d2f;
  justify-content: space-between;
  @media (min-width: 768px) {
    width: 94%;
    margin: auto;
    margin-top: 23px;
    border-radius: 10px;
    padding: 24px;
  }
  @media (min-width: 1440px) {
    display: flex;
    flex-direction: column;
    padding: ${(props) => (props.activePage === "home" ? "32px" : "0")};
    padding-top: 35px;
    max-height: 960px;
    margin-top: 32px;
    padding-bottom: 32px;
  }
`;

const Logoo = styled.img`
  width: 40px;
  height: 40px;
`;
const Navigationdiv = styled.div`
  display: flex;
  gap: 24px;
  @media (min-width: 1440px) {
    flex-direction: column;
    gap: 40px;
    padding-bottom: 500px;
    padding-top: 75px;
  }
`;

const LogoutDiv = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  line-height: 19px;
  color: #ffffff;
  @media (min-width: 768px) {
    font-size: 18px;
  }
  @media (min-width: 1440px) {
    font-size: 24px;
    gap: 20px;
  }
`;

const AvatarImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  @media (min-width: 768px) {
    width: 32px;
    height: 32px;
  }
  @media (min-width: 1440px) {
    width: 40px;
    height: 40px;
  }
`;

const Img = styled.img`
  width: 16px;
  height: 16px;
  @media (min-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;
