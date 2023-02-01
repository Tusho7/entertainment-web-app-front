import styled from "styled-components";
import Logo from "../Images/logo.svg";
import HomeLogo from "../Images/icon-nav-home.svg";
import MoviesLogo from "../Images/icon-nav-movies.svg";
import TvseriesLogo from "../Images/icon-nav-tv-series.svg";
import BookmarkLogo from "../Images/icon-nav-bookmark.svg";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const navHandler = (navText: string) => {
    if (navText === navText) {
      navigate(`/${navText}`);
    }
  };
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
`;

const Navigationdiv = styled.div`
  display: flex;
  gap: 24px;
`;

const Img = styled.img`
  width: 16px;
  height: 16px;
`;
