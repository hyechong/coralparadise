import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
import { styled } from 'styled-components';

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBarForm = styled.form`
  width: 70%;
  padding: 0.5rem 2rem;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 30px;
  display: flex;
  justify-content: space-evenly;
  column-gap: 1rem;
`;

const SearchBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  border: none;
  border-right: 1px solid #e9e9e9;
  padding-right: 1rem;
  &:nth-child(4) {
    border: none;
  }
  &:nth-child(5) {
    border: none;
    padding-right: 0;
    background-color: #ff6666;
    border-radius: 50%;
    padding: 0.5rem;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    width: 37.5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span {
    font-size: 16px;
  }
  div {
    color: #999;
  }
  input {
    border: none;
    outline: none;
    cursor: pointer;
    color: #999;
  }
  .searchIcon {
    font-size: 18px;
  }
`;
const HeadCountInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  label {
    font-size: 14px;
    color: #888;
  }
  input {
    width: 30px;
  }
`;

const HeadCountWrapper = styled.div`
  display: flex;
`;

const SearchBar = ({ location, checkIn, checkOut, adults, children, pets }) => {
  const [inputs, setInputs] = useState({
    location: location,
    checkIn: checkIn,
    checkOut: checkOut,
    adults: adults,
    children: children,
    pets: pets,
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
    <SearchBarWrapper>
      <SearchBarForm onSubmit={handleOnSubmit}>
        <SearchBtn>
          <span>위치</span>
          <input
            type='text'
            placeholder={location}
            ref={focusRef}
            name='location'
            value={inputs.location}
            onChange={handleOnChange}
          />
        </SearchBtn>
        <SearchBtn>
          <span>체크인</span>
          <input
            type='date'
            name='checkIn'
            value={inputs.checkIn}
            onChange={handleOnChange}
          />
        </SearchBtn>
        <SearchBtn>
          <span>체크아웃</span>
          <input
            type='date'
            name='checkOut'
            value={inputs.checkOut}
            onChange={handleOnChange}
          />
        </SearchBtn>
        <SearchBtn>
          <span>인원</span>
          <HeadCountWrapper>
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
          </HeadCountWrapper>
        </SearchBtn>
        <SearchBtn>
          <RiSearchLine className='searchIcon' />
        </SearchBtn>
      </SearchBarForm>
    </SearchBarWrapper>
  );
};

export default SearchBar;
