import "./Header.css";

export const Header = () => {
  return (
    <div>
      <div className='logo my-4'>
        <img
          src='https://prekit.netlify.app/images/preCodes.png'
          className='logo-img'
          alt='Logo'
        />
        <p className='logo-txt text-3xl'>Quiz App</p>
      </div>
    </div>
  );
};
