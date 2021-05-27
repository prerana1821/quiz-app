import { useEffect, useState } from "react";
import "./Toast.css";

export const Toast = ({ statusSuccess, statusError, quizStatusError }) => {
  const [toastVisibility, setToastVisibility] = useState(true);

  useEffect(() => {
    const toastVisible = setTimeout(() => {
      setToastVisibility(false);
    }, 2000);
    return () => {
      clearTimeout(toastVisible);
    };
  }, []);

  return (
    <>
      {toastVisibility && (
        <div className='toast tl-error status'>
          <div className='tl-content-error'>
            <i className='fas fa-check-circle'></i>
            <p>{statusSuccess || statusError || quizStatusError}</p>
          </div>
        </div>
      )}
    </>
  );
};
