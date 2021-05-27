import { useLocation, useNavigate } from "react-router";
import { useAuth } from "./../../context";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const { status, loginUserWithCredentials } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const loginHandler = async () => {
    const result = await loginUserWithCredentials(
      loginCredentials.username,
      loginCredentials.password
    );
    // if (result) {
    //   navigate(state?.from ? state.from : "/");
    // }
  };

  return (
    <div className='login-form'>
      <h2 className='text-3xl font-bold'>Login</h2>
      <div className='login-input'>
        <input
          type='text'
          className='input-txt-error'
          required
          value={loginCredentials.username}
          onChange={(e) =>
            setLoginCredentials(() => ({
              ...loginCredentials,
              username: e.target.value,
            }))
          }
        />
        <span className='flt-label flt-label-form tri-pink'>
          <i className='fas fa-user'></i> Username
        </span>
      </div>

      <div className='login-input'>
        <input
          className='input-txt-error'
          required
          type={loginCredentials.showPassword ? "text" : "password"}
          value={loginCredentials.password}
          onChange={(e) =>
            setLoginCredentials(() => ({
              ...loginCredentials,
              password: e.target.value,
            }))
          }
        />
        <span className='flt-label flt-label-form tri-pink'>
          <i className='fas fa-lock'></i> Password
        </span>
        <button
          className='show-pass'
          onClick={() =>
            setLoginCredentials(() => ({
              ...loginCredentials,
              showPassword: !loginCredentials.showPassword,
            }))
          }
        >
          {loginCredentials.showPassword ? (
            <i className='far fa-lg fa-eye-slash'></i>
          ) : (
            <i className='far fa-lg  fa-eye'></i>
          )}
        </button>
      </div>
      <h3>
        {/* {status && <img className='loading' src={Loading} alt={Loading} />} */}
      </h3>
      <button className='btn btn-main' onClick={loginHandler}>
        Login
      </button>
      <p>
        Don't have an account?
        <Link to='/signup'>
          <span className='pink-txt'> Sign up!</span>
        </Link>
      </p>
    </div>
  );
};
