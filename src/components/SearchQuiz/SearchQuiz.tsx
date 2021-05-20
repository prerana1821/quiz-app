import { useState } from "react";
import { useQuiz } from "../../context";
import "./SearchQuiz.css";

export const SearchQuiz = () => {
  const [search, setSearch] = useState("");
  const { quizDispatch } = useQuiz();

  return (
    <div className='search'>
      <input
        className='search-input'
        type='text'
        placeholder='Search Quiz...'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          quizDispatch({
            type: "SEARCH_QUIZ",
            payload: { searchString: search },
          });
        }}
      />
    </div>
  );
};
