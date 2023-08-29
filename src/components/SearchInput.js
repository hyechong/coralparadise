import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { getFormattedTodayDate, getFormattedTomorrowDate } from '../utils/util';
import Button from './Button';

const HeadCountInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  label {
    font-size: 14px;
    color: #888;
  }
`;
const SearchInputWrapper = styled.div`
  width: 100%;
  padding: 2rem 1.25rem;
  background: #fff;
  border-radius: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, -0.77);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  span {
    color: #999;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0.5rem 1.25rem;
  border: 1px solid #efefef;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  display: flex;
  input {
    outline: none;
    border: none;
  }
  ::placeholder {
    color: #888;
  }
  /* & > .calender-wrapper {
    display: flex;
    justify-content: space-between;
  } */
  & > .check-in {
    padding-right: 1.25rem;
    border-right: 1px solid #efefef;
  }
  h4 {
    color: #333;
  }
`;

const SearchInput = () => {
  const [inputs, setInputs] = useState({
    location: '',
    checkIn: getFormattedTodayDate(new Date()),
    checkOut: getFormattedTomorrowDate(new Date()),
    adults: 1,
    children: 0,
    pets: 0,
  });
  const focusRef = useRef();
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const handleOnSubmit = (e) => {
    if (inputs.location === '') {
      e.preventDefault();
      focusRef.current.focus();
      alert('필수값을 입력해 주세요.');
      return;
    } else {
      e.preventDefault();
      navigate(
        `/search-lists?location=${inputs.location}&checkIn=${inputs.checkIn}&checkOut=${inputs.checkOut}&adults=${inputs.adults}&children=${inputs.children}&pets=${inputs.pets}`
      );
    }
  };

  return (
    <div>
      <SearchInputWrapper>
        <h2>휴가 임대 시설</h2>
        <span>CoralParadise에서 독특한 숙소를 예약하세요</span>
        <form onSubmit={handleOnSubmit}>
          <InputWrapper>
            <div className='location'>
              <h4>위치</h4>
              <input
                type='text'
                name='location'
                value={inputs.location}
                onChange={handleOnChange}
                ref={focusRef}
                placeholder='여행지를 입력하세요.'
              />
            </div>
            <div className='headcount'>
              <h4>인원</h4>
              <HeadCountInputWrapper>
                <label htmlFor='adults'>성인</label>
                <input
                  id='adults'
                  type='number'
                  placeholder='성인'
                  name='adults'
                  value={inputs.adults}
                  onChange={handleOnChange}
                />
              </HeadCountInputWrapper>
              <HeadCountInputWrapper>
                <label htmlFor='children'>유아동</label>
                <input
                  id='children'
                  type='number'
                  placeholder='유아동'
                  name='children'
                  value={inputs.children}
                  onChange={handleOnChange}
                />
              </HeadCountInputWrapper>
              <HeadCountInputWrapper>
                <label htmlFor='pets'>반려동물</label>
                <input
                  id='pets'
                  type='number'
                  placeholder='반려동물'
                  name='pets'
                  value={inputs.pets}
                  onChange={handleOnChange}
                />
              </HeadCountInputWrapper>
            </div>
          </InputWrapper>
          <InputWrapper>
            <div className='check-in'>
              <h4>체크인</h4>
              <input
                type='date'
                name='checkIn'
                value={inputs.checkIn}
                onChange={handleOnChange}
              />
            </div>
            <div className='check-out'>
              <h4>체크아웃</h4>
              <input
                type='date'
                name='checkOut'
                value={inputs.checkOut}
                onChange={handleOnChange}
              />
            </div>
          </InputWrapper>
          <Button type='submit' text='검색' mode='hero'></Button>
        </form>
      </SearchInputWrapper>
    </div>
  );
};

export default SearchInput;
