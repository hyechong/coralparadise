import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderImage from '../assets/slick.jpeg';
import { SliderWrapper } from '../styles/Slider.styled';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiStarSFill,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { sliderList } from '../utils/sliderList';
import { Container } from '../styles/CommonStyles';

const SliderSection = () => {
  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <RiArrowLeftSLine />,
    nextArrow: <RiArrowRightSLine />,
  };
  return (
    <div>
      <Container>
        <SliderWrapper>
          <Slider {...settings} className='slider-wrapper'>
            {sliderList.map(({ image, title, address, stars, linkId }) => (
              <div className='slide-item' key={linkId}>
                <img src={SliderImage} alt='' />
                <div className='slider-text'>
                  <h3>{title}</h3>
                  <p>
                    <em>{address}</em>
                    <span>
                      {Array.from({ length: stars }).map((_, index) => (
                        <RiStarSFill key={index} />
                      ))}
                    </span>
                  </p>
                  <Link to={`/details/${linkId}`}>자세히 보기</Link>
                </div>
              </div>
            ))}
          </Slider>
        </SliderWrapper>
      </Container>
    </div>
  );
};

export default SliderSection;
