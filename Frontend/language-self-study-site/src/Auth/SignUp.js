import React from "react";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import "./styles/SignUp.css";

const SignUp = () => {
  const firstNameRef = useRef(null);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="logo">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span>Fluent</span>
            <span className="accent">Flow</span>
          </Link>
        </div>
        <h1>Zarejestruj się</h1>
        <p className="tagline">
          Rozpocznij swoją przygodę z językiem angielskim już dziś!
        </p>

        <form id="registration-form">
          <div className="form-group">
            <label htmlFor="first-name">
              Imię<span className="required">*</span>
            </label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              ref={firstNameRef}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="last-name">
              Nazwisko<span className="required">*</span>
            </label>
            <input type="text" id="last-name" name="last-name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Adres e-mail<span className="required">*</span>
            </label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="language-choice">
            <div className="form-group">
              <label htmlFor="current-level">
                Twój aktualny poziom<span className="required">*</span>
              </label>
              <select id="current-level" name="current-level" required>
                <option value="">Wybierz poziom</option>
                <option value="beginner">Początkujący (A1)</option>
                <option value="elementary">Podstawowy (A2)</option>
                <option value="intermediate">Średniozaawansowany (B1)</option>
                <option value="upperIntermediate">
                  Wyższy średniozaawansowany (B2)
                </option>
                <option value="advanced">Zaawansowany (C1)</option>
                <option value="proficient">Biegły (C2)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="learning-goal">
                Cel nauki<span className="required">*</span>
              </label>
              <select id="learning-goal" name="learning-goal" required>
                <option value="">Wybierz cel</option>
                <option value="general">Ogólny rozwój</option>
                <option value="business">Angielski biznesowy</option>
                <option value="academic">Angielski akademicki</option>
                <option value="travel">Podróże</option>
                <option value="exam">Przygotowanie do egzaminu</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Hasło<span className="required">*</span>
            </label>
            <input type="password" id="password" name="password" required />
            <div className="error" id="password-error"></div>
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">
              Potwierdź hasło<span className="required">*</span>
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
            />
            <div className="error" id="confirm-password-error"></div>
          </div>

          <div className="benefits">
            <h3>Korzyści z rejestracji:</h3>
            <ul>
              <li>Dostęp do wielu interaktywnych lekcji</li>
              <li>Ćwiczenia z wymowy i słownictwa</li>
              <li>Materiały dostosowane do Twojego poziomu</li>
              <li>Śledzenie postępów i statystyki nauki</li>
              <li>Dostęp z dowolnego urządzenia</li>
            </ul>
          </div>

          <p className="required-fields-note">
            <span className="required">*</span> - pola obowiązkowe
          </p>

          <button type="submit">Zarejestruj się i zacznij naukę</button>
        </form>

        <div className="login-link">
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
