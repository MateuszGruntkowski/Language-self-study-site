import React from "react";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer class="footer" id="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <h3>
              Fluent<span style={{ color: "#3498db" }}>Flow</span>
            </h3>
            <p>Twoja droga do płynnego angielskiego</p>
          </div>
          <div class="footer-contact">
            <h4>Kontakt</h4>
            <p>Email: info@angielskiplus.pl</p>
            <p>Telefon: +48 123 456 789</p>
            <p>Adres: ul. Językowa 15, 00-001 Warszawa</p>
          </div>
          <div class="footer-social">
            <h4>Śledź nas</h4>
            <div class="social-icons">
              <a href="#" class="social-icon">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-x-twitter"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 FluentFlow. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
