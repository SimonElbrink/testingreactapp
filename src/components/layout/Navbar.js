import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar bg-todo'>
      <h1>
        <i className='fa fa-clipboard-list' /> Currency list
      </h1>
      <ul>
        <li>
          <Link to='/'>List</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
