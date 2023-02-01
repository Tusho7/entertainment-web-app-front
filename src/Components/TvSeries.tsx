import TvseriesLogo from "../Images/icon-nav-tv-series.svg";
import SearchIcon from "../Images/icon-search.svg";
import EmptyBookmark from "../Images/icon-bookmark-empty.svg";
import FullBookmark from "../Images/icon-bookmark-full.svg";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataTypes } from "../types/data-type";
import Header from "./Header";

function TvSeries() {
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

  const tvSeries = listItems.filter((item) => item.category === "TV Series");

  const filteredTvSeries = tvSeries.filter((film) => {
    return film.title.toLowerCase().includes(searchTerm.toLowerCase());
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
        <>
          <Title>TV Series</Title>
          <TvSeriesDiv>
            {filteredTvSeries.map((tvseries) => {
              return (
                <div>
                  <ImageAndBookmarkDiv>
                    <TvSeriesPictures
                      src={`https://entertainment-web-u5fj.onrender.com/allimages/${tvseries.thumbnail.regular.small}`}
                    />
                    {tvseries.isBookmarked ? (
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
                    <Details>{tvseries.year}</Details>
                    <TvSerieLogo src={TvseriesLogo} />

                    <Details>{tvseries.category}</Details>

                    <Details>{tvseries.rating}</Details>
                  </DetailsDiv>

                  <TitleDiv>
                    <p>{tvseries.title}</p>
                  </TitleDiv>
                </div>
              );
            })}
          </TvSeriesDiv>
        </>
      </div>
    </div>
  );
}

export default TvSeries;

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

const TvSeriesDiv = styled.div`
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

const TvSeriesPictures = styled.img`
  width: 164px;
  height: 110px;
  border-radius: 8px;
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

const TvSerieLogo = styled.img`
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
