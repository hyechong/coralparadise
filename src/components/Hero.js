import React from 'react';
import { Container } from '../styles/CommonStyles';
import SearchInput from './SearchInput';
import MainImage from '../assets/main.jpg';
import { styled } from 'styled-components';

const HeroSection = styled.section`
  position: relative;

  .image-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    border-radius: 30px;
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
  return (
    <HeroSection className='section'>
      <Container>
        <div className='image-wrapper'>
          <img src={MainImage} alt='main' />
        </div>
        <div className='search-input-wrapper'>
          <SearchInput />
        </div>
      </Container>
    </HeroSection>
  );
};

export default Hero;
