import { useTheme } from "../../context";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import Dark from "./../../images/moon.png";
import Light from "../../images/sun.svg";

export const Header = () => {
  const [toggle, setToggle] = useState(true);
  const { theme, changeTheme } = useTheme();
  const [toggleTheme, setToggleTheme] = useState<boolean>(true);

  return (
    <header className='header' style={theme}>
      <nav className='navbar' style={theme}>
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
        <ul className={toggle ? "nav-menu" : "nav-menu active"} style={theme}>
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
          <li
            className='nav-item'
            onClick={() => {
              setToggleTheme(!toggleTheme);
              changeTheme(toggleTheme ? "lightTheme" : "darkTheme");
            }}
          >
            {toggleTheme ? (
              <img src={Dark} alt='Dark' className='dark' />
            ) : (
              <img src={Light} alt='Light' className='light' />
            )}
          </li>
        </ul>
        <div
          onClick={() => setToggle(!toggle)}
          className={toggle ? "hamburger" : "hamburger active"}
        >
          <span
            className='bar'
            style={{ backgroundColor: theme.barBackground }}
          ></span>
          <span
            className='bar'
            style={{ backgroundColor: theme.barBackground }}
          ></span>
          <span
            className='bar'
            style={{ backgroundColor: theme.barBackground }}
          ></span>
        </div>
      </nav>
    </header>
  );
};
