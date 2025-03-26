import React from "react";
import "./styles/Testimonials.css";
// import avatarMan1 from "../../public/avatars/avatarMan1.png";
// import avatarMan2 from "../../public/avatars/avatarMan2.png";
// import avatarWoman1 from "../../public/avatars/avatarWoman1.png";
// import avatarMan2 from "../assets/avatars/avatarMan2.png";
// import avatarWoman1 from "../assets/avatars/avatarWoman1.png";

const Testimonials = () => {
  return (
    <section class="testimonials" id="testimonials">
      <div class="container">
        <h2 class="section-title">Co mówią nasi uczniowie</h2>
        <div class="testimonials-container">
          <div class="testimonial-card">
            <p class="testimonial-text">
              "Po 3 miesiącach nauki z FluentFlow odważyłam się w końcu
              rozmawiać z klientami po angielsku. Mój szef był pod wrażeniem
              moich postępów!"
            </p>
            <div class="testimonial-author">
              <img class="testimonial-avatar" src="avatars/avatarWoman1.png" />
              <div>
                <div class="testimonial-name">Anna Kowalska</div>
                <div class="testimonial-role">
                  Specjalistka ds. Obsługi Klienta
                </div>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <p class="testimonial-text">
              "Dzięki regularnej nauce z tą platformą zdałem egzamin FCE z
              wynikiem B. Metoda naprawdę działa, polecam każdemu!"
            </p>
            <div class="testimonial-author">
              <img class="testimonial-avatar" src="/avatars/avatarMan1.png" />
              <div>
                <div class="testimonial-name">Marek Nowak</div>
                <div class="testimonial-role">Student informatyki</div>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <p class="testimonial-text">
              "Szukałem elastycznego rozwiązania, które pozwoli mi uczyć się w
              moim własnym tempie. FluentFlow idealnie spełnił moje oczekiwania.
              Wsparcie lektorów online jest nieocenione!"
            </p>
            <div class="testimonial-author">
              <img class="testimonial-avatar" src="avatars/avatarMan2.png" />
              <div>
                <div class="testimonial-name">Piotr Wiśniewski</div>
                <div class="testimonial-role">Manager projektu</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
