import React from 'react';
import { styled } from 'styled-components';

const CommonBtn = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.point};
  border: 1px solid ${({ theme }) => theme.colors.point};
  color: #fff;
  padding: 0.75rem 0;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.4s;
`;

const SubWhiteBtn = styled(CommonBtn)`
  width: 50%;
  background: #fff;
  color: #333;
  border-radius: 25px;

  &:hover {
    background: ${({ theme }) => theme.colors.point};
    color: #fff;
  }
`;

const SubPointBtn = styled(CommonBtn)`
  width: 50%;
  background: ${({ theme }) => theme.colors.point};
  color: #fff;
  border-radius: 25px;

  &:hover {
    background: #fff;
    color: #333;
  }
`;

const Button = ({ text, mode }) => {
  if (mode === 'hero') {
    return <CommonBtn>{text}</CommonBtn>;
  } else if (mode === 'sub-white') {
    return <SubWhiteBtn>{text}</SubWhiteBtn>;
  } else if (mode === 'sub-point') {
    return <SubPointBtn>{text}</SubPointBtn>;
  }
};

export default Button;
