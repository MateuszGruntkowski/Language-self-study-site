import React from "react";
import "./styles/EditProfile.css";

const EditProfile = ({ user, profilePicture, setProfilePicture }) => {
  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
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

  return (
    <div className="edit-profile">
      <h2 className="edit-profile-title">Edit Profile</h2>

      <form>
        <div className="form-group profile-pic-section">
          <label>Profile Picture</label>
          <div className="profile-pic-container">
            <div className="current-profile-pic">
              {profilePicture ? (
                <img
                  src={profilePicture.profilePicBase64}
                  alt="Profile Picture"
                  className="profile-pic-preview"
                />
              ) : (
                <div className="profile-pic-placeholder">
                  <span className="pic-initials">
                    {user.username
                      ? user.username.charAt(0).toUpperCase()
                      : "U"}
                  </span>
                </div>
              )}
            </div>
            <div className="profile-pic-actions">
              <input
                type="file"
                id="profile-pic-input"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="file-input"
              />
              <label htmlFor="profile-pic-input" className="upload-btn">
                Change Picture
              </label>
              {/* {profilePicture && (
                <button type="button" className="remove-btn">
                  Remove Picture
                </button>
              )} */}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={user.username || ""}
            onChange={() => {}}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={user.email || ""}
            onChange={() => {}}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter new password"
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="language-level">Language Level</label>
          <select id="language-level" className="select-control">
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

        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
