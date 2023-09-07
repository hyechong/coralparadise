import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Container } from '../styles/CommonStyles';
import { fetchData, getOptions } from '../utils/fetchData';
import { getFormattedTodayDate, getFormattedTomorrowDate } from '../utils/util';
import Button from './Button';
import Slider from 'react-slick';
import { SliderWrapper } from '../styles/Slider.styled';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiStarSFill,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';

const CustomSearchWrapper = styled.div`
  text-align: center;

  h3 {
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 180%;
    letter-spacing: 0.25rem;

    select {
      font-size: 1.8rem;
      font-weight: 600;
      text-decoration: underline;
    }
  }

  .buttons {
    width: 50%;
    display: flex;
    margin: auto;
    column-gap: 1rem;
    margin-top: 2.5rem;
  }
`;

const CustomSearch = () => {
  let settings = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <RiArrowLeftSLine />,
    nextArrow: <RiArrowRightSLine />,
  };
  const [slider, setSlider] = useState([]);
  const [options, setOptions] = useState({
    loca: 'America',
    adults: '1',
    children: '1',
    pets: '0',
    checkIn: getFormattedTodayDate(new Date()),
    checkOut: getFormattedTomorrowDate(new Date()),
  });
  const [customValue, setCustomValue] = useState({
    loca: 'America',
    adults: '1',
    children: '1',
    pets: '0',
    checkIn: getFormattedTodayDate(new Date()),
    checkOut: getFormattedTomorrowDate(new Date()),
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (value === 'child') {
      setOptions({
        ...options,
        adults: '1',
        children: '1',
        pets: '0',
      });
    } else if (value === 'alone') {
      setOptions({
        ...options,
        adults: '1',
        children: '0',
        pets: '0',
      });
    } else if (value === 'couple') {
      setOptions({
        ...options,
        adults: '2',
        children: '0',
        pets: '0',
      });
    } else if (value === 'pet') {
      setOptions({
        ...options,
        adults: '1',
        children: '0',
        pets: '1',
      });
    } else {
      setOptions({
        ...options,
        [name]: value,
      });
    }
  };

  // console.log(options);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setCustomValue(options);
  };
  const getCustomData = async () => {
    const getData = await fetchData(
      `https://airbnb13.p.rapidapi.com/search-location?location=${customValue.loca}&checkin=${customValue.checkIn}&checkout=${customValue.checkOut}&adults=${customValue.adults}&children=${customValue.children}&infants=0&pets=${customValue.pets}&page=1&currency=KRW`,
      getOptions
    );

    setSlider(getData.results);
  };
  useEffect(() => {
    // getCustomData();
  }, [customValue]);
  console.log(customValue);
  console.log(slider);

  return (
    <CustomSearchWrapper id='custom-search' className='section'>
      <Container>
        <form className='text-wrapper' onSubmit={handleOnSubmit}>
          <h3>
            나는
            <select
              onChange={handleOnChange}
              name='guest'
              value={options.guest}>
              <option key='child' value='child'>
                👶 아이와 함께
              </option>
              <option key='alone' value='alone'>
                👤 나 홀로
              </option>
              <option key='couple' value='couple'>
                👩‍❤️‍👨연인과 함께
              </option>
              <option key='pet' value='pet'>
                🐶 반려동물과 함께
              </option>
            </select>
            <br />
            <select onChange={handleOnChange} name='loca' value={options.loca}>
              <option key='America' value='America'>
                🇺🇸 미국으로
              </option>
              <option key='SouthEastAsia' value='SouthEastAsia'>
                🏖️ 동남아로
              </option>
              <option key='Japan' value='Japan'>
                🏙️ 일본으로
              </option>
              <option key='Europe' value='Japan'>
                🇪🇺 유럽으로
              </option>
              <option key='Guam' value='Japan'>
                🏝️ 괌으로
              </option>
            </select>
            떠나고 싶어요
          </h3>
          <div className='buttons'>
            <Button type='submit' text='최신순' mode='sub-white' />
            <Button text='리뷰순' mode='sub-point' />
          </div>
        </form>
      </Container>
      <Container>
        <SliderWrapper>
          <Slider {...settings} className='slider-wrapper'>
            {slider.map((data) => (
              <div className='slide-item'>
                <img src={data.images[0]} alt='' />
                <div className='slider-text'>
                  <h3>{data.name}</h3>
                  <p>
                    <em>{data.address}</em>
                    <em>★ {data.rating}</em>

                    <span>
                      {/* {Array.from({ length: {data.rating} }).map((_, index) => (
                        <RiStarSFill key={index} />
                      ))} */}
                    </span>
                  </p>
                  <Link to={`/details/${data.id}`}>
                    <strong>자세히 보기</strong>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </SliderWrapper>
      </Container>
    </CustomSearchWrapper>
  );
};

export default CustomSearch;
