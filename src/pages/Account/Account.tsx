import { useAuth } from "./../../context";

export const Account = () => {
  const { user, logout } = useAuth();

  return (
    <div className='account flex flex-col items-center m-11'>
      <h2 className='text-3xl font-bold'>Hello {user.username}</h2>
      <p className='text-2xl pb-4'>{user.email}</p>
      <button className='btn btn-main' onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
};
