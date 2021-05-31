import { useAuth, useTheme } from "../../context";
import { useState } from "react";
import Loading from "./../../images/loading.svg";
import { Link } from "react-router-dom";

export const Signup = () => {
  const { status, signUpUserWithCredentials } = useAuth();
  const { theme } = useTheme();
  const [signUpCredentials, setSignUpCredentials] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    msg: "",
  });

  const signUpHandler = async () => {
    if (
      signUpCredentials.email &&
      signUpCredentials.username &&
      signUpCredentials.password
    ) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          signUpCredentials.email
        )
      ) {
        if (signUpCredentials.password === signUpCredentials.confirmPassword) {
          await signUpUserWithCredentials(
            signUpCredentials.username,
            signUpCredentials.password,
            signUpCredentials.email
          );
        } else {
          setSignUpCredentials({
            ...signUpCredentials,
            msg: "Passwords doesn't Match",
          });
        }
      } else {
        setSignUpCredentials({
          ...signUpCredentials,
          msg: "Enter a valid email id",
        });
      }
    } else {
      setSignUpCredentials({
        ...signUpCredentials,
        msg: "Every field is required",
      });
    }
  };

  return (
    <div className='login-form'>
      <h2 className='text-3xl font-bold'>Sign Up</h2>
      <form
        className='flex flex-col items-center'
        onSubmit={(e) => e.preventDefault()}
      >
        <div className='login-input'>
          <input
            type='email'
            className='input-txt-error'
            required
            style={{
              boxShadow: theme.primaryBoxShadow,
              backgroundColor: theme.backgroundColor,
            }}
            value={signUpCredentials.email}
            onChange={(e) =>
              setSignUpCredentials(() => ({
                ...signUpCredentials,
                msg: "",
                email: e.target.value,
              }))
            }
          />
          <span className='flt-label flt-label-form tri-pink'>
            <i className='fas fa-envelope'></i> Email
          </span>
        </div>

        <div className='login-input'>
          <input
            type='text'
            className='input-txt-error'
            required
            style={{
              boxShadow: theme.primaryBoxShadow,
              backgroundColor: theme.backgroundColor,
            }}
            value={signUpCredentials.username}
            onChange={(e) =>
              setSignUpCredentials(() => ({
                ...signUpCredentials,
                msg: "",
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
            style={{
              boxShadow: theme.primaryBoxShadow,
              backgroundColor: theme.backgroundColor,
            }}
            type={signUpCredentials.showPassword ? "text" : "password"}
            value={signUpCredentials.password}
            onChange={(e) =>
              setSignUpCredentials(() => ({
                ...signUpCredentials,
                msg: "",
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
              setSignUpCredentials(() => ({
                ...signUpCredentials,
                showPassword: !signUpCredentials.showPassword,
              }))
            }
          >
            {signUpCredentials.showPassword ? (
              <i className='far fa-lg fa-eye-slash'></i>
            ) : (
              <i className='far fa-lg  fa-eye'></i>
            )}
          </button>
        </div>

        <div className='login-input'>
          <input
            className='input-txt-error'
            required
            style={{
              boxShadow: theme.primaryBoxShadow,
              backgroundColor: theme.backgroundColor,
            }}
            type={signUpCredentials.showConfirmPassword ? "text" : "password"}
            value={signUpCredentials.confirmPassword}
            onChange={(e) =>
              setSignUpCredentials(() => ({
                ...signUpCredentials,
                msg: "",
                confirmPassword: e.target.value,
              }))
            }
          />
          <span className='flt-label flt-label-form tri-pink'>
            <i className='fas fa-lock'></i> Confirm Password
          </span>
          <button
            className='show-pass'
            onClick={() =>
              setSignUpCredentials(() => ({
                ...signUpCredentials,
                showConfirmPassword: !signUpCredentials.showConfirmPassword,
              }))
            }
          >
            {signUpCredentials.showConfirmPassword ? (
              <i className='far fa-lg fa-eye-slash'></i>
            ) : (
              <i className='far fa-lg  fa-eye'></i>
            )}
          </button>
        </div>

        <p>{signUpCredentials.msg}</p>

        <p className='mg'>
          Already have an account?
          <Link to='/login'>
            <span className='pink-txt'>Login up!</span>
          </Link>
        </p>

        <button className='btn btn-main' onClick={signUpHandler}>
          Sign Up
        </button>
      </form>
      <h3>
        {status.loading && (
          <img src={Loading} alt='loading' className='loading' />
        )}
      </h3>
    </div>
  );
};
