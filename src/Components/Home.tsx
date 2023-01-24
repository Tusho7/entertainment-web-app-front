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

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [listItems, setListItems] = useState<DataTypes[]>([]);

  useEffect(() => {
    const data = async () => {
      const res = await axios.get(
        "https://entertainment-web-u5fj.onrender.com/api/films"
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
        {searchTerm.length === 0 && (
          <>
            <Title>Trending</Title>
            <TrendingDiv>
              {trendingFilms.map((trending) => {
                return (
                  <div>
                    <TrendingImg
                      src={`https://entertainment-web-u5fj.onrender.com/allimages/${trending.thumbnail.regular.small}`}
                    />

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

                    <div></div>
                  </div>
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
              <div>
                <RecommendedPictures
                  src={`https://entertainment-web-u5fj.onrender.com/allimages/${object.thumbnail.regular.small}`}
                />
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
  );
}

export default Home;

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

const TrendingDiv = styled.div`
  position: relative;
  padding: 27px 16px 0px;
  display: flex;
  gap: 16px;
  overflow-x: scroll;
  font-weight: 500;
  font-size: 15px;
  line-height: 19px;
  color: #ffffff;
`;

const TrendingLists = styled.div`
  position: absolute;
  top: 105px;
  padding-left: 16px;
`;

const TrendingImg = styled.img`
  width: 240px;
  height: 140px;
  border-radius: 8px;
`;

const TrendingYearCategoryAndRating = styled.div`
  display: flex;
  gap: 10px;
  width: 200px;
`;

const TrendingTitle = styled.p`
  padding-top: 5px;
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
`;

const RecommendedPictures = styled.img`
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

const TitleDiv = styled.div`
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  padding-top: 6px;
`;
