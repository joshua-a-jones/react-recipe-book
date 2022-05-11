import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { UserProfileProvider } from "./context/UserProfileContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProfileProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </UserProfileProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
