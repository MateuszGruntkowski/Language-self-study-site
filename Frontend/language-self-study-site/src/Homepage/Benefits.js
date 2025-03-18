import React from "react";
import "./styles/Benefits.css";

const Benefits = () => {
  return (
    <section class="benefits" id="benefits">
      <div class="container">
        <h2 class="section-title">Dlaczego warto uczyć się angielskiego?</h2>
        <div class="benefits-container">
          <div class="benefit-card">
            <div class="benefit-icon">💼</div>
            <h3>Lepsza kariera</h3>
            <p>
              Zwiększ swoje szanse na rynku pracy i dostęp do międzynarodowych
              ofert. Osoby znające język angielski zarabiają średnio o 30%
              więcej.
            </p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🌍</div>
            <h3>Podróże bez barier</h3>
            <p>
              Komunikuj się swobodnie podczas podróży, zawieraj nowe znajomości
              i poznawaj świat bez ograniczeń językowych.
            </p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🧠</div>
            <h3>Rozwój umysłowy</h3>
            <p>
              Nauka języka angielskiego poprawia pamięć, koncentrację i opóźnia
              proces starzenia się mózgu. To inwestycja w Twoje zdrowie!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
