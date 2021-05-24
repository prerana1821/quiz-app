import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { QuizProvider, ThemeProvider } from "./context";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <QuizProvider>
          <App />
        </QuizProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
