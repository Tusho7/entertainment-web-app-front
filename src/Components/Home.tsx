import MoviesLogo from "../Images/icon-nav-movies.svg";
import TvseriesLogo from "../Images/icon-nav-tv-series.svg";
import SearchIcon from "../Images/icon-search.svg";
import EmptyBookmark from "../Images/icon-bookmark-empty.svg";
import FullBookmark from "../Images/icon-bookmark-full.svg";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataTypes, LogIn } from "../types/data-type";
import Header from "./Header";
import { keyframes } from "styled-components";

function Home({
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

  useEffect(() => {
    const data = async () => {
      const res = await axios.get(
        "https://entertainment-web-2qzi.onrender.com/api/films"
      );
      setListItems(res.data);
    };
    data();
  }, []);

  const allFilms = listItems.filter((item) => item.category === item.category);

  const trendingFilms = listItems.filter((item) => item.isTrending);
  const handleSubmit = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const filteredMovies = allFilms.filter((film) => {
    return film.title.toLowerCase().includes(searchTerm.toLowerCase());
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
          {searchTerm.length === 0 && (
            <>
              <Title>Trending</Title>
              <TrendingDiv>
                {trendingFilms.map((trending) => {
                  return (
                    <TrendingContainer
                      className="trending-container"
                      key={trending.id}
                    >
                      <ImageAndBookmarkDivTrending>
                        <TrendingImg
                          src={`https://entertainment-web-2qzi.onrender.com/allimages/${trending.thumbnail.regular.small}`}
                        />

                        {trending.isBookmarked ? (
                          <TrendingBookmarkDiv>
                            <img src={FullBookmark} />
                          </TrendingBookmarkDiv>
                        ) : (
                          <TrendingBookmarkDiv>
                            <img src={EmptyBookmark} />
                          </TrendingBookmarkDiv>
                        )}
                      </ImageAndBookmarkDivTrending>

                      <TrendingLists>
                        <TrendingYearCategoryAndRating>
                          <p>{trending.year}</p>
                          <TrendingOnlyCategory>
                            {trending.category === "Movie" && (
                              <MovieLogo src={MoviesLogo} />
                            )}
                            {trending.category === "TV Series" && (
                              <TvSerieLogo src={TvseriesLogo} />
                            )}
                            <p>{trending.category}</p>

                            <p>{trending.rating}</p>
                          </TrendingOnlyCategory>
                        </TrendingYearCategoryAndRating>

                        <TrendingTitle>{trending.title}</TrendingTitle>
                      </TrendingLists>
                    </TrendingContainer>
                  );
                })}
              </TrendingDiv>
            </>
          )}
        </div>

        <div>
          <Title>Recommended for you</Title>
          <RecommendedDiv>
            {filteredMovies.map((object) => {
              return (
                <div key={object.id}>
                  <ImageAndBookmarkDiv>
                    <RecommendedPictures
                      src={`https://entertainment-web-2qzi.onrender.com/allimages/${object.thumbnail.regular.small}`}
                    />
                    {object.isBookmarked ? (
                      <BookmarkDiv>
                        <img src={FullBookmark} />
                      </BookmarkDiv>
                    ) : (
                      <BookmarkDiv>
                        <img src={EmptyBookmark} />
                      </BookmarkDiv>
                    )}
                  </ImageAndBookmarkDiv>
                  <DetailsDiv>
                    <Details>{object.year}</Details>
                    {object.category === "Movie" && (
                      <MovieLogo src={MoviesLogo} />
                    )}
                    {object.category === "TV Series" && (
                      <TvSerieLogo src={TvseriesLogo} />
                    )}
                    <Details>{object.category}</Details>
                    <Details>{object.rating}</Details>
                  </DetailsDiv>
                  <TitleDiv>
                    <p>{object.title}</p>
                  </TitleDiv>
                </div>
              );
            })}
          </RecommendedDiv>
        </div>
      </div>
    </MainDiv>
  );
}

export default Home;

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
    border: none;
    width: 100%;
  }
`;

const myAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(calc(-100% * 4));
  }
`;

const TrendingDiv = styled.div`
  position: relative;
  padding: 27px 16px 0px;
  display: flex;
  gap: 16px;
  width: 100%;
  overflow: hidden;
  font-weight: 500;
  font-size: 15px;
  line-height: 19px;
  color: #ffffff;
  overflow-y: hidden;
  @media (min-width: 768px) {
    padding-left: 25px;
    gap: 40px;
  }
  @media (min-width: 1440px) {
    padding-top: 0px;
  }
`;

const TrendingContainer = styled.div`
  animation: ${myAnimation} 20s linear infinite;
  white-space: nowrap;
  display: inline-block;
`;

const ImageAndBookmarkDivTrending = styled.div`
  position: relative;
  width: 240px;
  @media (min-width: 768px) {
    width: 470px;
  }
`;

const ImageAndBookmarkDiv = styled.div`
  position: relative;
  max-width: 164px;
  @media (min-width: 768px) {
    max-width: 220px;
  }
  @media (min-width: 1440px) {
    max-width: 280px;
  }
`;

const TrendingBookmarkDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 8px;
  right: 8px;
  background: #10141e;
  mix-blend-mode: normal;
  opacity: 0.7;
  border-radius: 50%;
  overflow: hidden;
  @media (min-width: 768px) {
    right: 24px;
    top: 16px;
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
    top: 16px;
  }
  @media (min-width: 1440px) {
    top: 16px;
  }
`;

const TrendingLists = styled.div`
  position: absolute;
  top: 85px;
  padding-left: 16px;
  @media (min-width: 768px) {
    top: 160px;
  }
  @media (min-width: 1440px) {
    top: 145px;
  }
`;

const TrendingImg = styled.img`
  width: 240px;
  height: 140px;
  border-radius: 8px;
  @media (min-width: 768px) {
    width: 470px;
    height: 230px;
  }
`;

const TrendingYearCategoryAndRating = styled.div`
  display: flex;
  gap: 10px;
  width: 200px;
`;

const TrendingTitle = styled.p`
  padding-top: 5px;
  overflow-y: hidden;
  @media (min-width: 768px) {
    font-size: 24px;
    padding-top: 6px;
  }
  @media (min-width: 1440px) {
    padding-top: 11px;
  }
`;

const TrendingOnlyCategory = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const MovieLogo = styled.img`
  width: 12px;
  height: 12px;
`;

const TvSerieLogo = styled.img`
  width: 12px;
  height: 12px;
`;

const RecommendedDiv = styled.div`
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
    grid-template-columns: auto auto auto auto;
    column-gap: 40px;
    row-gap: 32px;
    padding-top: 0px;
    max-width: 1290px;
  }
`;

const RecommendedPictures = styled.img`
  width: 164px;
  height: 110px;
  border-radius: 8px;
  @media (min-width: 768px) {
    width: 220px;
    height: 140px;
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
  @media (min-width: 768px) {
    font-size: 13px;
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
    padding-left: 25px;
    font-size: 32px;
    padding-top: 34px;
  }
  @media (min-width: 1440px) {
    padding-top: 40px;
    padding-bottom: 25px;
  }
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
