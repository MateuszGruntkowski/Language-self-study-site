import React, { use } from "react";
import "./styles/Login.css";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

const Login = () => {
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div class="login-page">
      <div class="login-container">
        <div class="logo">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span>Fluent</span>
            <span class="accent">Flow</span>
          </Link>
        </div>
        <h1>Logowanie</h1>
        <p class="tagline">Kontynuuj swoją naukę języka angielskiego</p>

        <form id="login-form">
          <div class="form-group">
            <label for="email">
              Adres e-mail<span class="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              required
            />
            <div class="error" id="email-error"></div>
          </div>

          <div class="form-group">
            <label for="password">
              Hasło<span class="required">*</span>
            </label>
            <input type="password" id="password" name="password" required />
            <div class="error" id="password-error"></div>
          </div>

          <div class="login-actions">
            <div class="remember-me">
              <input type="checkbox" id="remember" name="remember" />
              <label for="remember">Zapamiętaj mnie</label>
            </div>
            <a href="#" class="forgot-password">
              Zapomniałeś hasła?
            </a>
          </div>

          <button type="submit">Zaloguj się</button>

          <div class="register-link">
            Nie masz jeszcze konta? <Link to="/signup">Zarejestruj się</Link>
          </div>

          <div>
            <Link to="/learn">lekcje</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
