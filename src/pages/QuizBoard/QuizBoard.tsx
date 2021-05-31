import { useQuiz } from "../../context";
import "./QuizBoard.css";

export const QuizBoard = () => {
  const { currentQuiz } = useQuiz();
  console.log({ currentQuiz });

  return (
    <div>
      <h1 className='text-3xl font-bold mx-9'>Quiz Leader Board</h1>
      <table className='quizscore table-auto shadow-lg divide-y divide-gray-200 mx-11'>
        <thead className='bg-gray-50'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              User Name
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Score
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {currentQuiz?.highScore
            ?.sort((a, b) => (a.score > b.score ? -1 : 1))
            .map((item) => {
              return (
                <tr key={item.userId.username}>
                  <td className=' px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900'>
                          {item.userId.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className=' px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{item.score}</div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
