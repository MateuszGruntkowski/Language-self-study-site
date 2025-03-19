import React from "react";
import "./styles/Features.css";
// import girlLearningImage from "../assets/images/GirlLearning.png";

const Features = () => {
  return (
    <section class="features" id="features">
      <div class="container">
        <h2 class="section-title">Jak uczymy angielskiego?</h2>
        <div class="features-container">
          <div class="features-content">
            <p>
              Nasza platforma oferuje kompleksowe i spersonalizowane podejście
              do nauki języka angielskiego. Dzięki najnowszym technologiom i
              sprawdzonym metodom nauczania, osiągniesz swoje cele językowe
              szybciej i efektywniej.
            </p>
            <div class="feature-list">
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div>
                  <h3>Spersonalizowany plan nauki</h3>
                  <p>
                    Nasz system dobiera materiały i ćwiczenia indywidualnie do
                    Twoich potrzeb i poziomu zaawansowania.
                  </p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div>
                  <h3>Interaktywne ćwiczenia</h3>
                  <p>
                    Nauka poprzez praktyczne zadania i interakcje, które
                    angażują wszystkie zmysły.
                  </p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div>
                  <h3>Natychmiastowa informacja zwrotna</h3>
                  <p>
                    Otrzymuj informacje o swoich postępach na bieżąco i ucz się
                    na własnych błędach.
                  </p>
                </div>
              </div>
            </div>
            <a href="#" class="btn">
              Wypróbuj metodę
            </a>
          </div>
          <div class="features-image">
            <img
              src="/images/homepage-images/GirlLearning.png"
              alt="Nauka angielskiego online"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
