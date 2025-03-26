// components/RankingItem.js
import React from "react";

const RankingItem = ({ user, position }) => {
  const positionClass =
    position === 1
      ? "top-position"
      : position === 2
      ? "second-position"
      : position === 3
      ? "third-position"
      : "";

  return (
    <li className="ranking-item">
      <div className={`ranking-position ${positionClass}`}>{position}</div>
      <div className="user-info">
        <img
          src={user.avatar}
          alt="Avatar użytkownika"
          className="user-avatar"
        />
        <div className="user-details">
          <p className="user-name">{user.name}</p>
          <p className="user-level">Poziom {user.level}</p>
        </div>
      </div>
      <div className="user-xp">{user.xp} XP</div>
    </li>
  );
};

export default RankingItem;
