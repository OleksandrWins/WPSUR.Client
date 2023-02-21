import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/mainPage";
import RegisterPage from "./pages/RegisterPage/registerPage";

const App = () => {
  function isAuthenticated(): boolean {
    if (localStorage.getItem("token")) {
      return true;
    }

    return false;
  }

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated() ? (
          <Route path="/*" element={<MainPage />} />
        ) : (
          <Route path="*" element={<Navigate to="/sign-in" />} />
        )}
        {isAuthenticated() ? null : <Route path="/sign-in" element={<LoginPage />} />}
        {isAuthenticated() ? null : <Route path="/sign-up" element={<RegisterPage />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
