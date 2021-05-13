import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import { Header } from './components';
import { Home, Quizes } from './pages';

function App() {

  return (
    <div className="App">
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/quizes' element={<Quizes />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
