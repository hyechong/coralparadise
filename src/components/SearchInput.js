import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { getFormattedTodayDate, getFormattedTomorrowDate } from '../utils/util';

const SearchInputWrapper = styled.div`
  width: 400px;
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
  button {
    width: 100%;
    height: auto;
    padding: 1rem 1.25rem;
    background: #ff6666;
    text-align: center;
    border: none;
    color: #fff;
    border-radius: 10px;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0.5rem 1.25rem;
  border: 1px solid #efefef;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 0.5rem;
  input {
    outline: none;
    border: none;
    width: 100%;
  }
  & > .calender-wrapper {
    display: flex;
    justify-content: space-between;
  }
  & > .calender-wrapper > .check-in {
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
        `/search-lists?location=${inputs.location}&checkIn=${inputs.checkIn}&checkOut=${inputs.checkOut}`
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
            <h4>위치</h4>
            <input
              type='text'
              name='location'
              value={inputs.location}
              onChange={handleOnChange}
              ref={focusRef}
              placeholder='여행지를 입력하세요.'
            />
          </InputWrapper>
          <InputWrapper>
            <div className='calender-wrapper'>
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
            </div>
          </InputWrapper>
          <button type='submit'>검색</button>
        </form>
      </SearchInputWrapper>
    </div>
  );
};

export default SearchInput;
