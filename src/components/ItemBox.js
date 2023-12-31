import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const ItemBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const ItemBox = ({
  id,
  coverImg,
  address,
  name,
  price,
  location,
  checkIn,
  checkOut,
  adults,
  children,
  pets,
}) => {
  return (
    <div>
      <Link
        to={`/details?location=${location}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}&pets=${pets}&id=${id}`}>
        <ItemBoxWrapper>
          <CoverImg>
            <img src={coverImg} alt={name} />
          </CoverImg>
          <Desc>
            <h4>{name.length > 30 ? `${name.slice(0, 30)}...` : name}</h4>
            <span>
              {address.length > 30 ? `${address.slice(0, 30)}...` : address}
            </span>
            <div className='price'>
              ₩{Number(price.rate).toLocaleString()}/박 ・{' '}
              <span>총액 ₩{Number(price.total).toLocaleString()}</span>
            </div>
          </Desc>
        </ItemBoxWrapper>
      </Link>
    </div>
  );
};

export default ItemBox;
