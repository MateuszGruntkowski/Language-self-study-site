import React, { useRef, useState, useEffect } from "react";
import "./styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  axios.defaults.withCredentials = true;

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/learn"); // przekieruj po 1 sek.

        const token = response.data.token;
        localStorage.setItem("token", token);

        console.log("Zalogowano pomyślnie:", response.data);
      }
    } catch (error) {
      console.error("Błąd logowania:", error);
      setError("Niepoprawne dane logowania");
    }
  };

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

        <form id="login-form" onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="email">
              Nazwa użytkownika<span class="required">*</span>
            </label>
            <input
              type="username"
              id="username"
              name="username"
              ref={usernameRef}
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div class="form-group">
            <label for="password">
              Hasło<span class="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {error && <div className="error">{error}</div>}
          </div>

          {/* <div class="login-actions">
            <div class="remember-me">
              <input type="checkbox" id="remember" name="remember" />
              <label for="remember">Zapamiętaj mnie</label>
            </div>
            <a href="#" class="forgot-password">
              Zapomniałeś hasła?
            </a>
          </div> */}

          <button type="submit">Zaloguj się</button>

          <div class="register-link">
            Nie masz jeszcze konta? <Link to="/signup">Zarejestruj się</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
