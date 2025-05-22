import React, { useState, useEffect, use } from "react";
import RankingItem from "./RankingItem";
// import ranking from "./data/ranking-data";
import { getRankingData } from "./data/ranking-data";

import "./styles/Ranking.css";

const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const data = await getRankingData();
        setRanking(data);
      } catch (error) {
        console.error("Error fetching ranking data:", error);
      }
    };

    fetchRankingData();
  }, []);

  return (
    <section className="ranking-section" id="ranking">
      <div className="section-header">
        <h2 className="section-title">Ranking Użytkowników</h2>
      </div>

      <ul className="ranking-list">
        {ranking.map((user, index) => (
          <RankingItem key={index} user={user} position={index + 1} />
        ))}
      </ul>
    </section>
  );
};

export default Ranking;
