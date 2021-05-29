import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header, PrivateRoute, Toast } from "./components";
import { useAuth, useQuiz, useTheme } from "./context";
import {
  Home,
  Quizes,
  QuizComp,
  Result,
  Rules,
  Login,
  Signup,
  Account,
} from "./pages";
import { MyActivity } from "./pages/MyActivity/MyActivity";

function App() {
  const { theme } = useTheme();
  const { status } = useAuth();
  const { status: quizStatus } = useQuiz();

  return (
    <div className='App' style={theme}>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/quizzes' element={<Quizes />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <PrivateRoute path='/account' element={<Account />}></PrivateRoute>
          <PrivateRoute
            path='/rules/:quizId'
            element={<Rules />}
          ></PrivateRoute>
          <PrivateRoute
            path='/quizzes/:quizId'
            element={<QuizComp />}
          ></PrivateRoute>
          <PrivateRoute
            path='/my-activity'
            element={<MyActivity />}
          ></PrivateRoute>
          <PrivateRoute path='/result' element={<Result />}></PrivateRoute>
        </Routes>
        {(status.success ||
          status.error?.errorMessage ||
          quizStatus.error?.errorMessage) && (
          <Toast
            statusSuccess={status.success}
            quizStatusError={quizStatus.error?.errorMessage}
            statusError={status.error?.errorMessage}
          />
        )}
      </div>
    </div>
  );
}

export default App;
