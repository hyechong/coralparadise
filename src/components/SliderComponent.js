import React, { useState } from 'react';
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

const SliderComponent = ({ mode, data }) => {
  let settings = {};
  const [slider, setSlider] = useState(data);
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
            {slider.map((item) => (
              <div className='slide-item' key={item.id}>
                <img src={item.images[0]} alt={item.name} />
                <div className='slider-text'>
                  <h3>{item.name}</h3>
                  <p>
                    <em>{item.address}</em>
                    <span>
                      {Array.from({ length: Math.round(item.rating) }).map(
                        (_, index) => (
                          <RiStarSFill key={index} />
                        )
                      )}
                    </span>
                  </p>
                  <Link to={`/details/${item.id}`}>자세히 보기</Link>
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
    const sortedBestList = data.sort((a, b) => b.rating - a.rating);
    return (
      <div className='section'>
        <BestSlider>
          <Slider {...settings} className='slider-wrapper'>
            {sortedBestList.map((item, idx) => (
              <div className='slide-item' key={idx}>
                <img src={item.images[0]} alt='' />

                <div className='slider-text'>
                  <span className='label'>{idx + 1}위</span>
                  <Link to={`/details/${item.id}`}>
                    <h3>{item.name}</h3>
                  </Link>
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
