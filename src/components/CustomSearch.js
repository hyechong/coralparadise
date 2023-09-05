import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Container } from '../styles/CommonStyles';
import { fetchData, getOptions } from '../utils/fetchData';
import { getFormattedTodayDate, getFormattedTomorrowDate } from '../utils/util';
import Button from './Button';

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
  const [options, setOptions] = useState({
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

  const [customResults, setcustomResults] = useState([]);

  // console.log(options);
  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  const getCustomData = async () => {
    const getData = await fetchData(
      `https://airbnb13.p.rapidapi.com/search-location?location=${options.loca}&checkin=${options.checkIn}&checkout=${options.checkOut}&adults=${options.adults}&children=${options.children}&infants=0&pets=${options.pets}&page=1&currency=KRW`,
      getOptions
    );

    setcustomResults(getData.results);
  };
  useEffect(() => {
    // getCustomData();
  }, [handleOnSubmit]);
  console.log(customResults);

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
    </CustomSearchWrapper>
  );
};

export default CustomSearch;
