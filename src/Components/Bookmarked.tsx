import { useEffect, useState } from "react";
import Header from "./Header";
import SearchIcon from "../Images/icon-search.svg";
import styled from "styled-components";
import { DataTypes } from "../types/data-type";
import FullBookmark from "../Images/icon-bookmark-full.svg";
import MoviesLogo from "../Images/icon-nav-movies.svg";
import axios from "axios";
import TvseriesLogo from "../Images/icon-nav-tv-series.svg";

function Bookmarked() {
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
    <div>
      <Header />

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
              <div>
                <ImageAndBookmarkDiv>
                  <MoviesPictures
                    src={`https://entertainment-web-u5fj.onrender.com/allimages/${movie.thumbnail.regular.small}`}
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
              <div>
                <ImageAndBookmarkDiv>
                  <MoviesPictures
                    src={`https://entertainment-web-u5fj.onrender.com/allimages/${movie.thumbnail.regular.small}`}
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
  );
}

export default Bookmarked;

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
const ImageAndBookmarkDiv = styled.div`
  position: relative;
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
