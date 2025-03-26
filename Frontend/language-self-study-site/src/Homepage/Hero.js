import React from "react";
import { Link } from "react-router-dom";

import "./styles/Hero.css";

const Hero = () => {
  return (
    <section class="hero">
      <div class="container">
        <h1>Naucz się angielskiego w swoim tempie</h1>
        <p>
          Skuteczna nauka języka angielskiego dostosowana do Twoich potrzeb i
          możliwości czasowych. Osiągnij swoje cele językowe szybciej niż
          myślisz!
        </p>
        <Link to="/login" class="btn">
          Rozpocznij za darmo
        </Link>
      </div>
    </section>
  );
};

export default Hero;
