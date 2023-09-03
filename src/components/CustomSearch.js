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
  const [options, setOptions] = useState({});
  return (
    <CustomSearchWrapper id='custom-search' className='section'>
      <Container>
        <form className='text-wrapper'>
          <h3>
            나는
            <select>
              <option key='child' value='child'>
                👶 아이와 함께
              </option>
              <option key='child' value='child'>
                👤 나 홀로
              </option>
              <option key='couple' value='couple'>
                👩‍❤️‍👨연인과 함께
              </option>
              <option key='dog' value='dog'>
                🐶 반려동물과 함께
              </option>
            </select>
            <br />
            <select>
              <option key='America' value='America'>
                🇺🇸 미국으로
              </option>
              <option key='SouthEastAsia' value='SouthEastAsia'>
                🏖️ 동남아로
              </option>
              <option key='Japan' value='Japan'>
                🏙️ 일본으로
              </option>
              <option key='Europe' value='Europe'>
                🇪🇺 유럽으로
              </option>
              <option key='Guam' value='Guam'>
                🏝️ 괌으로
              </option>
            </select>
            떠나고 싶어요
          </h3>
          <div className='buttons'>
            <Button text='최신순' mode='sub-white' />
            <Button text='리뷰순' mode='sub-point' />
          </div>
        </form>
      </Container>
    </CustomSearchWrapper>
  );
};

export default CustomSearch;
