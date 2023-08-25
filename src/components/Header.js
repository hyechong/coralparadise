import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import logo from '../assets/logo.png';
import { Container } from '../styles/CommonStyles';
import { RiMenu3Line } from 'react-icons/ri';

const HeaderSection = styled.header`
  box-shadow: 0 0 7px 0px #ddd;

  .menu-icon {
    display: none;
  }

  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.8rem 20px;

    .navi {
      display: flex;
      gap: 1.25rem;

      a {
        font-size: 1.125rem;
        font-weight: 500;
      }
    }
  }
`;

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

const Header = () => {
  return (
    <HeaderSection>
      <Container>
        <NavList>
          <LogoLink to='/'>
            <img src={logo} alt='logo' />
          </LogoLink>
          <ul className='navi'>
            <li>
              <Link to='/'>홈</Link>
            </li>
            <li>
              <Link to='/wish-lists'>위시 리스트</Link>
            </li>
            <li>
              <Link to='/signin'>로그인</Link>
            </li>
            <li>
              <Link to='/signup'>회원가입</Link>
            </li>
          </ul>
        </NavList>
        <div className='menu-icon'>
          <button>
            <RiMenu3Line />
          </button>
        </div>
      </Container>
    </HeaderSection>
  );
};

export default Header;
