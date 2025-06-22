import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/SignUp.css";

const SignUp = () => {
  const usernameRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);

      // Tworzenie podglądu zdjęcia
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreviewImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Hasła się nie zgadzają.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append(
        "userJson",
        JSON.stringify({
          username,
          email,
          password,
        })
      );

      if (imageFile) {
        formDataToSend.append("imageFile", imageFile);
      }

      const response = await axios.post(
        "http://localhost:8080/api/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("token", response.data.token);
        setSuccess("Rejestracja zakończona sukcesem!");
        // setTimeout(() => navigate("/learn"), 1000); // przekieruj po 2 sek.
        navigate("/learn"); // przekieruj od razu
      }
    } catch (err) {
      const msg =
        err.response?.data ||
        "Wystąpił błąd podczas rejestracji. Spróbuj ponownie.";
      setError(msg);
    }
  };

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

        <form id="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              Nazwa użytkownika<span className="required">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              ref={usernameRef}
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Adres e-mail<span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Hasło<span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Potwierdź hasło<span className="required">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Dodanie pola do wyboru zdjęcia profilowego */}
          <div className="form-group profile-photo-section">
            <label htmlFor="profilePhoto">
              Zdjęcie profilowe <span className="optional">(opcjonalne)</span>
            </label>
            <input
              type="file"
              id="profilePhoto"
              name="profilePhoto"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
              ref={fileInputRef}
            />

            {previewImage && (
              <div className="image-preview-container">
                <img
                  src={previewImage}
                  alt="Podgląd zdjęcia profilowego"
                  className="image-preview"
                />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={removeImage}
                >
                  Usuń zdjęcie
                </button>
              </div>
            )}
          </div>

          {/* Pole wyboru poziomu językowego i celu nauki – na razie pomijane w POST */}
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

          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

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
