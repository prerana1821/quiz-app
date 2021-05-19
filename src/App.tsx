import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import { Home, Quizes } from "./pages";
import { Quiz } from "./pages/Quiz/Quiz";
import { Result } from "./pages/Result/Result";

function App() {
  return (
    <div className='App'>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/quizes' element={<Quizes />}></Route>
          <Route path='/quizes/:quizId' element={<Quiz />}></Route>
          <Route path='/result' element={<Result />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
