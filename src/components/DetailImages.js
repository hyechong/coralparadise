import React from 'react';
import { styled } from 'styled-components';

const DetailGridWrapper = styled.div`
  border-radius: 30px;
  overflow: hidden;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 250px;
  grid-auto-columns: 315px;
  grid-template-areas:
    'a a b c'
    'a a d e';
`;

const DetailImageWrapper = styled.div`
  background-color: #111;
  &:nth-child(1) {
    grid-area: a;
  }
  &:nth-child(2) {
    grid-area: b;
  }
  &:nth-child(3) {
    grid-area: c;
  }
  &:nth-child(4) {
    grid-area: d;
  }
  &:nth-child(5) {
    grid-area: e;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    opacity: 1;
    transition: all 0.4s;
  }
  img:hover {
    opacity: 0.7;
  }
`;

const DetailImages = ({ roomImages }) => {
  const gridImages = [];
  for (let i = 0; i < 5; i++) {
    gridImages.push(roomImages[i]);
  }
  return (
    <DetailGridWrapper>
      {gridImages.map((image) => (
        <DetailImageWrapper>
          <img src={image} alt='detailImg' />
        </DetailImageWrapper>
      ))}
    </DetailGridWrapper>
  );
};

export default DetailImages;
