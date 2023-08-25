import React from 'react';
import { styled } from 'styled-components';
import { Container } from '../styles/CommonStyles';
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
  return (
    <CustomSearchWrapper id='custom-search' className='section'>
      <Container>
        <div className='text-wrapper'>
          <h3>
            나는
            <select>
              <option key='child' value='child'>
                👶 아이와 함께
              </option>
              <option key='couple' value='couple'>
                👩‍❤️‍👨 연인과 함께
              </option>
              <option key='dog' value='dog'>
                🐶 반려동물과 함께
              </option>
            </select>
            <br />
            <select>
              <option key='America' value='America'>
                🇺🇸 미주/캐나다/대양주로
              </option>
              <option key='SouthEastAsia' value='SouthEastAsia'>
                🏖️ 동남아로
              </option>
              <option key='Asia' value='Asia'>
                🏙️ 일본/중국/대만/홍콩으로
              </option>
              <option key='Europe' value='Europe'>
                🇪🇺 유럽으로
              </option>
              <option key='Guam' value='Guam'>
                🏝️ 괌/사이판으로
              </option>
            </select>
            떠나고 싶어요
          </h3>
          <div className='buttons'>
            <Button text='최신순' mode='sub-white' />
            <Button text='리뷰순' mode='sub-point' />
          </div>
        </div>
      </Container>
    </CustomSearchWrapper>
  );
};

export default CustomSearch;
