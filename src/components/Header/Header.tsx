import "./Header.css";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <header className='header'>
      <nav className='navbar'>
        <Link to='/'>
          <div className='logo'>
            <img
              src='https://prekit.netlify.app/images/preCodes.png'
              className='logo-img'
              alt='Logo'
            />
            <p className='logo-txt text-3xl'>Quiz App</p>
          </div>
        </Link>
        <ul className={toggle ? "nav-menu" : "nav-menu active"}>
          <li className='nav-item'>
            <NavLink
              to='/'
              end
              activeStyle={{
                color: "var(--dk-pink)",
              }}
              className='nav-link text-2xl'
            >
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              className='nav-link text-2xl'
              activeStyle={{
                color: "var(--dk-pink)",
              }}
              to='/quizes'
            >
              My Activity
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              className='nav-link text-2xl'
              activeStyle={{
                color: "var(--dk-pink)",
              }}
              to='/quizes'
            >
              Login
            </NavLink>
          </li>
        </ul>
        <div
          onClick={() => setToggle(!toggle)}
          className={toggle ? "hamburger" : "hamburger active"}
        >
          <span className='bar'></span>
          <span className='bar'></span>
          <span className='bar'></span>
        </div>
      </nav>
    </header>
  );
};
