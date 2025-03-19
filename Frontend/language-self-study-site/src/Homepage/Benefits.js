import React from "react";
import "./styles/Benefits.css";
// import BetterCareerImg from "../assets/images/BetterCareer.png";
// import TravelsImg from "../assets/images/Travels.png";
// import StudyImg from "../assets/images/Study.png";

const Benefits = () => {
  return (
    <section class="benefits" id="benefits">
      <div class="container">
        <h2 class="section-title">Dlaczego warto uczyć się angielskiego?</h2>

        <div class="benefit-row">
          <div class="benefit-image">
            <img
              src="/images/homepage-images/BetterCareer.png"
              alt="Lepsza kariera zawodowa dzięki znajomości angielskiego"
            />
          </div>
          <div class="benefit-content">
            <h3>Lepsza kariera</h3>
            <p>
              Znajomość języka angielskiego znacząco zwiększa Twoje szanse na
              rynku pracy. Pracodawcy coraz częściej wymagają umiejętności
              językowych, a osoby władające językiem angielskim zarabiają
              średnio o 30% więcej. Otwiera to również drzwi do międzynarodowych
              ofert pracy i możliwości rozwoju zawodowego w globalnych firmach.
            </p>
          </div>
        </div>

        <div class="benefit-row reverse">
          <div class="benefit-content">
            <h3>Podróże bez barier</h3>
            <p>
              Dzięki znajomości angielskiego podróżowanie staje się łatwiejsze i
              przyjemniejsze. Możesz swobodnie komunikować się w niemal każdym
              zakątku świata, nawiązywać nowe znajomości z ludźmi z różnych
              kultur i samodzielnie radzić sobie w różnych sytuacjach. Odkrywaj
              świat bez ograniczeń językowych i czerpania z podróży pełną
              satysfakcję.
            </p>
          </div>
          <div class="benefit-image">
            <img
              src="/images/homepage-images/Travels.png"
              alt="Podróżowanie bez barier językowych"
            />
          </div>
        </div>

        <div class="benefit-row">
          <div class="benefit-image">
            <img
              src="/images/homepage-images/Study.png"
              alt="Rozwój umysłowy dzięki nauce języka"
            />
          </div>
          <div class="benefit-content">
            <h3>Rozwój umysłowy</h3>
            <p>
              Nauka języka angielskiego to doskonały trening dla Twojego mózgu.
              Badania pokazują, że osoby dwujęzyczne mają lepszą pamięć,
              zwiększoną koncentrację oraz lepsze umiejętności rozwiązywania
              problemów. Regularna nauka języka obcego opóźnia również procesy
              starzenia się mózgu i zmniejsza ryzyko chorób
              neurodegeneracyjnych. To inwestycja nie tylko w umiejętności, ale
              również w Twoje zdrowie!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
