import { useAuth } from "./../../context";
import "./Account.css";

export const Account = () => {
  const { user, logout } = useAuth();

  return (
    <div className='account'>
      <h2>Hello {user.username}</h2>
      <p>{user.email}</p>
      <button className='btn btn-main' onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
};
