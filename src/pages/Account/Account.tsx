import { useAuth, useUserDetail } from "./../../context";

export const Account = () => {
  const { user, logout } = useAuth();
  const { userDetailsState } = useUserDetail();

  return (
    <div className='account flex flex-col items-center m-11'>
      <h2 className='text-3xl font-bold'>Hello {user.username}</h2>
      <p className='text-2xl pb-4'>{user.email}</p>
      <p className='text-2xl pb-4'>Coins: {userDetailsState.coins}</p>
      <p className='text-2xl pb-4'>
        KnowledgeLevel: {userDetailsState.knowledgeLevel}
      </p>
      <p className='text-2xl pb-4'>
        Your Total Score: {userDetailsState.totalScore}
      </p>
      <button className='btn btn-main' onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
};
