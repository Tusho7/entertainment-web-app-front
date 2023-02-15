import { useEffect, useState } from "react";
import Header from "./Header";
import SearchIcon from "../Images/icon-search.svg";
import styled from "styled-components";
import { DataTypes, LogIn } from "../types/data-type";
import FullBookmark from "../Images/icon-bookmark-full.svg";
import MoviesLogo from "../Images/icon-nav-movies.svg";
import axios from "axios";
import TvseriesLogo from "../Images/icon-nav-tv-series.svg";

function Bookmarked({
  setIsLogin,
  handleeSubmit,
  email,
  setEmail,
  password,
  setPassword,
  error,
  user,
}: LogIn) {
  const [searchTerm, setSearchTerm] = useState("");
  const [listItems, setListItems] = useState<DataTypes[]>([]);

  const handleSubmit = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const data = async () => {
      const res = await axios.get(
        "https://entertainment-web-2qzi.onrender.com/api/films"
      );
      setListItems(res.data);
    };
    data();
  }, []);

  const movieFilms = listItems.filter((item) => item.category === "Movie");
  const bookmarkedMovies = movieFilms.filter(
    (bookmark) => bookmark.isBookmarked
  );

  const filteredMovies = bookmarkedMovies.filter((film) => {
    return film.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const tvSeries = listItems.filter((item) => item.category === "TV Series");
  const bookmarkedTvSeries = tvSeries.filter(
    (tvseries) => tvseries.isBookmarked
  );

  const filteredTvSeries = bookmarkedTvSeries.filter((tvseries) => {
    return tvseries.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <MainDiv>
      <Header
        setIsLogin={setIsLogin}
        handleeSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        error={error}
        password={password}
        setPassword={setPassword}
        user={user}
      />
      <div>
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
          <Title>Bookmarked Movies</Title>
          <MoviesDiv>
            {filteredMovies.map((movie) => {
              return (
                <div key={movie.id}>
                  <ImageAndBookmarkDiv>
                    <MoviesPictures
                      src={`https://entertainment-web-2qzi.onrender.com/allimages/${movie.thumbnail.regular.small}`}
                    />
                    {movie.isBookmarked ? (
                      <BookmarkDiv>
                        <img src={FullBookmark} />
                      </BookmarkDiv>
                    ) : null}
                  </ImageAndBookmarkDiv>

                  <DetailsDiv>
                    <Details>{movie.year}</Details>
                    <MovieLogo src={MoviesLogo} />
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
        </div>

        <div>
          <Title>Bookmarked TV Series</Title>
          <MoviesDiv>
            {filteredTvSeries.map((movie) => {
              return (
                <div key={movie.id}>
                  <ImageAndBookmarkDiv>
                    <MoviesPictures
                      src={`https://entertainment-web-2qzi.onrender.com/allimages/${movie.thumbnail.regular.small}`}
                    />
                    {movie.isBookmarked ? (
                      <BookmarkDiv>
                        <img src={FullBookmark} />
                      </BookmarkDiv>
                    ) : null}
                  </ImageAndBookmarkDiv>

                  <DetailsDiv>
                    <Details>{movie.year}</Details>

                    <MovieLogo src={TvseriesLogo} />

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
        </div>
      </div>
    </MainDiv>
  );
}

export default Bookmarked;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 1440px) {
    flex-direction: row;
    padding-left: 32px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 27px;
  padding-left: 19px;
  @media (min-width: 768px) {
    padding-left: 25px;
  }
  @media (min-width: 1440px) {
    padding-top: 32px;
  }
`;

const SearchLogo = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 19px;
  vertical-align: middle;
  @media (min-width: 768px) {
    width: 24px;
    height: 24px;
  }
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
  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const Title = styled.p`
  padding: 24px 16px 0px;
  font-weight: 300;
  font-size: 20px;
  line-height: 25px;
  letter-spacing: -0.3125px;
  color: #ffffff;
  overflow-y: hidden;
  @media (min-width: 768px) {
    font-size: 32px;
    padding-left: 25px;
  }
  @media (min-width: 1440px) {
    padding-top: 35px;
  }
`;

const MoviesDiv = styled.div`
  padding: 24px 16px 0px;
  display: grid;
  row-gap: 16px;
  column-gap: 15px;
  grid-template-columns: auto auto;
  overflow-x: hidden;
  padding-bottom: 61px;
  @media (min-width: 768px) {
    grid-template-columns: auto auto auto;
    padding-left: 25px;
    padding-right: 25px;
    column-gap: 29px;
    row-gap: 24px;
  }
  @media (min-width: 1440px) {
    grid-template-columns: 280px 280px 280px 280px;
    column-gap: 40px;
    row-gap: 32px;
    padding-top: 32px;
  }
`;
const ImageAndBookmarkDiv = styled.div`
  position: relative;
  width: 164px;
  @media (min-width: 768px) {
    width: 220px;
    max-width: 220px;
  }
  @media (min-width: 1440px) {
    max-width: 100%;
    width: 280px;
  }
`;

const BookmarkDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  position: absolute;
  right: 8px;
  top: 8px;
  background: #10141e;
  mix-blend-mode: normal;
  opacity: 0.7;
  border-radius: 50%;
  overflow: hidden;
  @media (min-width: 768px) {
    right: 16px;
  }
  @media (min-width: 1440px) {
    right: 16px;
    top: 16px;
  }
`;

const MoviesPictures = styled.img`
  width: 164px;
  height: 110px;
  border-radius: 8px;
  @media (min-width: 768px) {
    width: 220px;
  }
  @media (min-width: 1440px) {
    width: 280px;
    height: 174px;
  }
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
  overflow-y: hidden;
  mix-blend-mode: normal;
  opacity: 0.75;
  @media (min-width: 768px) {
    font-size: 13px;
  }
`;

const MovieLogo = styled.img`
  width: 12px;
  height: 12px;
`;

const TitleDiv = styled.div`
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
  padding-top: 6px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;
