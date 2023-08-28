import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: auto;
  max-width: 1280px;
  margin: auto;
  padding: 0 20px;
  position: relative;

  @media (max-width: ${({ theme }) => theme.tablet}) {
    width: 100%;
    height: auto;
    max-width: 768px;
    margin: auto;
    padding: 0 15px;
  }
`;
