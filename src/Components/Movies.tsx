import Logo from "../Images/logo.svg";
import HomeLogo from "../Images/icon-nav-home.svg";
import MoviesLogo from "../Images/icon-nav-movies.svg";
import TvseriesLogo from "../Images/icon-nav-tv-series.svg";
import BookmarkLogo from "../Images/icon-nav-bookmark.svg";
import SearchIcon from "../Images/icon-search.svg";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataTypes } from "../types/data-type";

function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [listItems, setListItems] = useState<DataTypes[]>([]);

  const handleSubmit = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const data = async () => {
      const res = await axios.get(
        "https://entertainment-web-u5fj.onrender.com/api/films"
      );
      setListItems(res.data);
    };
    data();
  }, []);

  const movieFilms = listItems.filter((item) => item.category === "Movie");

  const filteredMovies = movieFilms.filter((film) => {
    return film.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <NavigationContainer>
        <div>
          <img src={Logo} />
        </div>

        <Navigationdiv>
          <Img src={HomeLogo} />
          <Img src={MoviesLogo} />
          <Img src={TvseriesLogo} />
          <Img src={BookmarkLogo} />
        </Navigationdiv>
      </NavigationContainer>

      <SearchContainer>
        <SearchLogo src={SearchIcon} alt="search-logo" />
        <SearchInput
          type="text"
          placeholder="Search for movies or TV series"
          value={searchTerm}
          onChange={handleSubmit}
        />
      </SearchContainer>

      <div>
        <>
          <Title>Movies</Title>
          <MoviesDiv>
            {filteredMovies.map((movie) => {
              return (
                <div>
                  <MoviesPictures
                    src={`https://entertainment-web-u5fj.onrender.com/allimages/${movie.thumbnail.regular.small}`}
                  />

                  <DetailsDiv>
                    <Details>{movie.year}</Details>
                    {movie.category === "Movie" && (
                      <MovieLogo src={MoviesLogo} />
                    )}
                    <Details>{movie.category}</Details>

                    <Details>{movie.rating}</Details>
                  </DetailsDiv>

                  <TitleDiv>
                    <p>{movie.title}</p>
                  </TitleDiv>
                </div>
              );
            })}
          </MoviesDiv>
        </>
      </div>
    </div>
  );
}

export default Movies;

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

const SearchContainer = styled.div`
  padding-top: 27px;
  padding-left: 19px;
`;

const SearchLogo = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 19px;
  vertical-align: middle;
`;

const SearchInput = styled.input`
  width: 85%;
  background-color: #10141e;
  border: none;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  mix-blend-mode: normal;
  opacity: 0.5;
`;

const Title = styled.p`
  padding: 24px 16px 0px;
  font-weight: 300;
  font-size: 20px;
  line-height: 25px;
  letter-spacing: -0.3125px;
  color: #ffffff;
`;

const MoviesDiv = styled.div`
  padding: 24px 16px 0px;
  display: grid;
  row-gap: 16px;
  column-gap: 15px;
  grid-template-columns: auto auto;
  overflow-x: hidden;
  padding-bottom: 61px;
`;

const MoviesPictures = styled.img`
  width: 164px;
  height: 110px;
  border-radius: 8px;
`;

const DetailsDiv = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

const Details = styled.p`
  font-weight: 300;
  font-size: 11px;
  line-height: 14px;
  color: #ffffff;
  mix-blend-mode: normal;
  opacity: 0.75;
`;

const MovieLogo = styled.img`
  width: 12px;
  height: 12px;
`;

const TitleDiv = styled.div`
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  padding-top: 6px;
`;
