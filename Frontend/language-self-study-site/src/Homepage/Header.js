import React from "react";
import "./styles/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div class="container nav-container">
        <Link to="/" class="logo">
          Fluent<span>Flow</span>
        </Link>
        <nav>
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
              <a href="#contact">Kontakt</a>
            </li>
          </ul>
        </nav>
        <div class="auth-buttons">
          <a href="#login" class="login-btn">
            Logowanie
          </a>
          <Link to="/signup" class="register-btn">
            Rejestracja
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
