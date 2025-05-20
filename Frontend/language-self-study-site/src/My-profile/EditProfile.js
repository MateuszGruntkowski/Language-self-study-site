import React from "react";
import "./styles/EditProfile.css";

const EditProfile = ({ user }) => {
  return (
    <div class="edit-profile">
      <h2 class="edit-profile-title">Edit Profile</h2>

      <form>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            class="form-control"
            value={user.username}
          />
        </div>

        {/* <div class="form-group">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" class="form-control" value="Doe" />
        </div> */}

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            class="form-control"
            value={user.email}
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            class="form-control"
            placeholder=""
          />
        </div>

        <div class="form-group">
          <label for="language-level">Language Level</label>
          <select id="language-level" class="select-control">
            <option value="beginner">Beginner (A1)</option>
            <option value="elementary">Elementary (A2)</option>
            <option value="intermediate" selected>
              Intermediate (B1)
            </option>
            <option value="upper-intermediate">Upper Intermediate (B2)</option>
            <option value="advanced">Advanced (C1)</option>
            <option value="proficient">Proficient (C2)</option>
          </select>
        </div>

        <button type="submit" class="save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
