import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { useTheme } from "./context";
import { Home, Quizes, QuizComp, Result, Rules } from "./pages";

function App() {
  const { theme } = useTheme();

  return (
    <div className='App' style={theme}>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/quizzes' element={<Quizes />}></Route>
          <Route path='/rules/:quizId' element={<Rules />}></Route>
          <Route path='/quizzes/:quizId' element={<QuizComp />}></Route>
          <Route path='/result' element={<Result />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
