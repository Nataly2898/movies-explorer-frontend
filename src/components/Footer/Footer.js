import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
     <div className="footer__container">
     <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer-content">
        <p className="footer__copyright">© 2022</p>
        <div className="footer__list">
          <a
            className="footer__link"
            href="https://practicum.yandex.ru/"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>

          <a
            className="footer__link"
            href="https://github.com/Nataly2898"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
     </div>
    </footer>
  );
};

export default Footer;
