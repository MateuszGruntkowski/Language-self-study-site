import { useState, useEffect, React } from "react";
import "./styles/EditProfile.css";
import axios from "axios";

const EditProfile = ({
  user,
  profilePicture,
  setProfilePicture,
  setUserData,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("imageFile", file);

    try {
      const response = await fetch(
        "http://localhost:8080/api/updateProfilePic",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile picture");
      }

      const data = await response.json();
      console.log("Profile picture updated successfully:", data);

      setProfilePicture(data);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Resetuj błędy
    setSuccess(""); // Resetuj komunikat sukcesu

    const updateData = {
      username,
      email,
      password: password || undefined,
    };

    try {
      const response = await axios.patch(
        "http://localhost:8080/api/updateProfile",
        JSON.stringify(updateData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Response from updateProfile:", response);
      if (response.status === 200 || response.status === 201) {
        const data = await response.data;
        console.log("Profile updated:", data);

        setUserData((prev) => ({
          ...prev,
          username: data.username,
          email: data.email,
        }));

        console.log("Token from response:", response.data.token);
        localStorage.setItem("token", response.data.token);
        setSuccess("Profil został zaktualizowany pomyślnie!");
      }
    } catch (err) {
      console.log(err.response?.data);
      const msg =
        err.response?.data ||
        "Wystąpił błąd podczas aktualizacji profilu. Spróbuj ponownie.";
      setError(msg);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-heading">Edit Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className="edit-profile-form-group edit-profile-pic-section">
          <label>Profile Picture</label>
          <div className="edit-profile-pic-container">
            <div className="edit-profile-current-pic">
              {profilePicture ? (
                <img
                  src={profilePicture.profilePicBase64}
                  alt="Profile Picture"
                  className="edit-profile-pic-preview"
                />
              ) : (
                <div className="edit-profile-pic-placeholder">
                  <span className="edit-profile-pic-initials">
                    {user.username
                      ? user.username.charAt(0).toUpperCase()
                      : "U"}
                  </span>
                </div>
              )}
            </div>
            <div className="edit-profile-pic-actions">
              <input
                type="file"
                id="profile-pic-input"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="edit-profile-file-input"
              />
              <label
                htmlFor="profile-pic-input"
                className="edit-profile-upload-btn"
              >
                Change Picture
              </label>
            </div>
          </div>
        </div>

        <div className="edit-profile-form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="edit-profile-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="edit-profile-form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="edit-profile-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* <div className="edit-profile-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="edit-profile-input"
            placeholder="Enter new password"
          />
        </div> */}

        {/* <div className="edit-profile-form-group">
          <label htmlFor="language-level">Language Level</label>
          <select id="language-level" className="edit-profile-select">
            <option value="beginner">Beginner (A1)</option>
            <option value="elementary">Elementary (A2)</option>
            <option value="intermediate" defaultValue>
              Intermediate (B1)
            </option>
            <option value="upper-intermediate">Upper Intermediate (B2)</option>
            <option value="advanced">Advanced (C1)</option>
            <option value="proficient">Proficient (C2)</option>
          </select>
        </div> */}

        <button type="submit" className="edit-profile-save-btn">
          Save Changes
        </button>
      </form>

      {success && <div className="edit-profile-success-message">{success}</div>}
      {error && <div className="edit-profile-error-message">{error}</div>}
    </div>
  );
};

export default EditProfile;
