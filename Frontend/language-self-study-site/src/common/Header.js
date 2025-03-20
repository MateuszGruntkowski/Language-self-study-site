import React from "react";
import "./styles/Header.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const renderNavLinks = () => {
    if (location.pathname === "/") {
      return (
        <ul>
          <li>
            <a href="#benefits">Korzyści</a>
          </li>
          <li>
            <a href="#features">Jak uczymy</a>
          </li>
          <li>
            <a href="#testimonials">Opinie</a>
          </li>
          <li>
            <a href="#footer">Kontakt</a>
          </li>
        </ul>
      );
    } else if (location.pathname === "/learn") {
      return (
        <ul>
          <li>
            <a href="#lessons">Lekcje</a>
          </li>
          <li>
            <a href="#ranking">Ranking</a>
          </li>
          <li>
            <a href="#footer">Kontakt</a>
          </li>
          <li>
            <Link to="/my-profile">Mój profil</Link>
          </li>
        </ul>
      );
    }
  };
  return (
    <header>
      <div class="container nav-container">
        <Link to="/" class="logo">
          Fluent<span>Flow</span>
        </Link>
        <nav>{renderNavLinks()}</nav>
        <div class="auth-buttons">
          <Link to="/login" class="login-btn">
            Logowanie
          </Link>
          <Link to="/signup" class="register-btn">
            Rejestracja
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
