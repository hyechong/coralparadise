import React from 'react';
import { Link } from 'react-router-dom';
import { NavList } from '../styles/HeaderStyle';

const Header = () => {
  return (
    <div>
      <NavList>
        <ul className='navi'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/search-lists'>SearchLists</Link>
          </li>
        </ul>
      </NavList>
    </div>
  );
};

export default Header;
