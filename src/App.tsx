import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, Quizes, QuizComp, Result } from "./pages";

function App() {
  return (
    <div className='App'>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/quizes' element={<Quizes />}></Route>
          <Route path='/quizes/:quizId' element={<QuizComp />}></Route>
          <Route path='/result' element={<Result />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
