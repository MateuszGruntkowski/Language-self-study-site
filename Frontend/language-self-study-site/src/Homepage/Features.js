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
              Nasza platforma łączy naukę słownictwa z interaktywnymi
              ćwiczeniami i elementami grywalizacji. Dzięki angażującej formie i
              przejrzystemu systemowi postępów uczysz się efektywnie, we własnym
              tempie - z większą motywacją i satysfakcją.
            </p>
            <div class="feature-list">
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div>
                  <h3>Różnorodne zadania i fiszki</h3>
                  <p>
                    Poznajesz nowe słowa poprzez fiszki, quizy tłumaczeniowe,
                    układanie zdań czy ćwiczenia typu „posłuchaj i powtórz” -
                    tak, by łatwiej zapamiętać i utrwalić materiał.
                  </p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div>
                  <h3>Punkty, ranking i dodatkowa motywacja</h3>
                  <p>
                    Każde wykonane zadanie to kolejne punkty doświadczenia i
                    awans w rankingu. Nauka staje się grą, w której chcesz
                    sięgać coraz wyżej.
                  </p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div>
                  <h3>Twoje postępy zawsze pod ręką</h3>
                  <p>
                    W panelu użytkownika masz dostęp do liczby wykonanych zadań,
                    zdobytych punktów i własnych statystyk - wszystko w jednym
                    miejscu, by śledzić rozwój i utrzymać rytm nauki.
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
