import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, QuizProvider, ThemeProvider } from "./context";
import App from "./App";
import "./index.css";
import { UserDetailProvider } from "./context/UserDetail/UserDetail";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <UserDetailProvider>
            <QuizProvider>
              <App />
            </QuizProvider>
          </UserDetailProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
