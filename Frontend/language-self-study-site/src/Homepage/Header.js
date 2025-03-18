import React from "react";
import "./styles/Header.css";

const Header = () => {
  return (
    <header>
      <div class="container nav-container">
        <a href="#" class="logo">
          Angielski<span>Plus</span>
        </a>
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
      </div>
    </header>
  );
};

export default Header;
