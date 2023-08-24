import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const ResultsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const CoverImg = styled.div`
  object-fit: cover;
  height: 300px;
  width: 100%;
  img {
    border-radius: 30px;
    width: 100%;
    height: 100%;
  }
`;
const Desc = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
  padding: 0.5rem 0;
  span {
    color: #999;
  }
  & > .price > span {
    text-decoration: underline;
  }
`;

const SearchResults = ({ id, coverImg, address, name, price }) => {
  return (
    <div>
      <Link to={`/details/${id}`}>
        <ResultsWrapper>
          <CoverImg>
            <img src={coverImg} alt={name} />
          </CoverImg>
          <Desc>
            <h4>{name.length > 38 ? `${name.slice(0, 38)}...` : name}</h4>
            <span>
              {address.length > 38 ? `${address.slice(0, 38)}...` : address}
            </span>
            <div className='price'>
              ₩{Number(price.rate).toLocaleString()}/박 ・{' '}
              <span>총액 ₩{Number(price.total).toLocaleString()}</span>
            </div>
          </Desc>
        </ResultsWrapper>
      </Link>
    </div>
  );
};

export default SearchResults;
