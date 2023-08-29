import React from 'react';
import Slider from 'react-slick';
import { SliderWrapper } from '../styles/Slider.styled';
import SliderImage from '../assets/slick.jpeg';
import { BestSlider } from '../styles/Slider.styled';
import { Link } from 'react-router-dom';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiStarSFill,
} from 'react-icons/ri';

import { sliderList } from '../utils/sliderList';
import { bestList } from '../utils/bestList';

const SliderComponent = ({ mode }) => {
  let settings = {};
  if (mode === 'custom') {
    settings = {
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
      </div>
    );
  } else if (mode === 'best') {
    settings = {
      arrows: false,
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
    const sortedBestList = bestList.sort(
      (a, b) => b.star - a.star || a.id - b.id
    );
    return (
      <div className='section'>
        <BestSlider>
          <Slider {...settings} className='slider-wrapper'>
            {sortedBestList.map(({ star, name, id }, idx) => (
              <div className='slide-item' key={idx}>
                <img src={SliderImage} alt='' />

                <div className='slider-text'>
                  <span className='label'>{idx + 1}위</span>
                  <h3>{name}</h3>
                </div>
              </div>
            ))}
          </Slider>
        </BestSlider>
      </div>
    );
  }
};

export default SliderComponent;
