import React, { useEffect, useState } from 'react';
import { Container } from '../styles/CommonStyles';
import SearchInput from './SearchInput';
import MainImage from '../assets/main.jpg';
import { styled } from 'styled-components';
import { getFormattedTodayDate, getFormattedTomorrowDate } from '../utils/util';
import { fetchData, getOptions } from '../utils/fetchData';

const HeroSection = styled.section`
  position: relative;

  .image-wrapper {
    width: 75%;
    height: 75vh;
    /* display: flex;
    justify-content: flex-end; */
    border-radius: 30px;
    object-fit: cover;
    overflow: hidden;
    margin-left: 25%;
  }
  .image-wrapper img {
    width: 100%;
    height: 100%;
  }

  .search-input-wrapper {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    /* border-radius: 15px; */
    /* box-shadow: -3px 3px 10px #ccc; */
    width: 40%;
    max-width: 550px;
  }
`;

const Hero = () => {
  const [data, setData] = useState([]);
  const getLandingImgData = async () => {
    const getData = await fetchData(
      `https://airbnb13.p.rapidapi.com/search-location?location=Korea&checkin=${getFormattedTodayDate(
        new Date()
      )}&checkout=${getFormattedTomorrowDate(
        new Date()
      )}&adults=1&children=0&infants=0&pets=0&page=1&currency=KRW`,
      getOptions
    );

    setData(
      getData.results[Math.floor(Math.random() * getData.results.length)]
        .images[0]
    );
  };
  useEffect(() => {
    getLandingImgData();
  }, []);
  console.log(data);

  return (
    <HeroSection className='section'>
      <Container>
        <div className='image-wrapper'>
          <img src={data} alt='main' />
        </div>
        <Container className='search-input-wrapper'>
          <SearchInput />
        </Container>
      </Container>
    </HeroSection>
  );
};

export default Hero;
