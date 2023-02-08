import styled from "styled-components";
import Logo from "../Images/logo.svg";
import HomeLogo from "../Images/icon-nav-home.svg";
import MoviesLogo from "../Images/icon-nav-movies.svg";
import TvseriesLogo from "../Images/icon-nav-tv-series.svg";
import BookmarkLogo from "../Images/icon-nav-bookmark.svg";
import { useNavigate } from "react-router-dom";
import { LogIn } from "../types/data-type";

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

  console.log(user.avatar);

  return (
    <div>
      <NavigationContainer>
        <div>
          <img src={Logo} />
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

const NavigationContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  padding: 18px 16px;
  background: #161d2f;
  justify-content: space-between;
`;

const Navigationdiv = styled.div`
  display: flex;
  gap: 24px;
`;

const LogoutDiv = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  line-height: 19px;
  color: #ffffff;
`;

const AvatarImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const Img = styled.img`
  width: 16px;
  height: 16px;
`;
