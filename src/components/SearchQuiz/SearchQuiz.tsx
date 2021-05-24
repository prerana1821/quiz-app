import { useState } from "react";
import { useQuiz, useTheme } from "../../context";
import "./SearchQuiz.css";

export const SearchQuiz = () => {
  const [search, setSearch] = useState("");
  const { quizDispatch } = useQuiz();
  const { theme } = useTheme();

  return (
    <div className='search'>
      <input
        className='search-input'
        style={theme}
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
