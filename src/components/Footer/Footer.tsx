import "./Footer.css";
export const Footer = () => {
  return (
    <footer className='main-footer'>
      <p>
        © | 2021 | <span className='pink-txt'>Quizzel</span>
      </p>
      <p className='pink-txt'>Quizzel by preCodes</p>

      <ul className='footer-list'>
        <li>
          <a className='links' href='mailto: prerananw1@gmail.com'>
            <i className='far fa-2x fa-envelope'></i>
          </a>
        </li>

        <li>
          <a className='links' href='https://github.com/prerana1821'>
            <i className='fab fa-2x fa-github'></i>
          </a>
        </li>

        <li>
          <a className='links' href='https://twitter.com/precodes18'>
            <i className='fab fa-2x fa-twitter'></i>
          </a>
        </li>
        <li>
          <a
            className='links'
            href='https://www.linkedin.com/in/prerana-nawar/'
          >
            <i className='fab fa-2x fa-linkedin-in'></i>
          </a>
        </li>
      </ul>
    </footer>
  );
};
