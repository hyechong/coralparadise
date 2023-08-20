import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import logo from '../assets/logo.png';
import { Container } from '../styles/CommonStyles';

const NavList = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  padding: 1.25rem 0;

  ul {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  & > .logo-wrapper {
    width: 200px;
  }
  & > .logo-wrapper > img {
    width: 100%;
  }
`;
const LogoLink = styled(Link)`
  width: 200px;
  & > img {
    width: 100%;
  }
`;
const ShadowHeader = styled(Container)`
  box-shadow: 1px 1px 5px #efefef;
`;

const Header = () => {
  return (
    <header>
      <ShadowHeader>
        <NavList>
          <LogoLink to='/'>
            <img src={logo} alt='logo' />
          </LogoLink>
          <ul className='navi'>
            <li>
              <Link to='/'>로그인</Link>
            </li>
            <li>
              <Link to='/wish-lists'>위시리스트</Link>
            </li>
          </ul>
        </NavList>
      </ShadowHeader>
    </header>
  );
};

export default Header;
