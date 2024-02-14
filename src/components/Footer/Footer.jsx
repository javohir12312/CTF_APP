import React from "react";
import styles from "./Footer.module.scss";
import { useSelector } from "react-redux";
import { Forimage } from "../../server/api";
import { Link } from "react-router-dom";

const Footer = () => {
  const { themeList } = useSelector((state) => state.theme);
  const { lang } = useSelector((state) => state.lang);
  const { logoList } = useSelector((state) => state.logo);
  const { phoneInsta } = useSelector((state) => state.phoneInsta);

  const goToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className={`${styles.footer} ${
        themeList ? styles.footerLight : styles.footerDark
      }`}
    >
      <div className="container">
        <div className={styles.footer__top}>
          <Link className={styles.footer__link} onClick={goToTop} to="">
            {logoList?.map((el) => {
              return (
                <img
                  key={el._id}
                  className={styles.footer__logo}
                  width={50}
                  height={50}
                  src={`${Forimage}${el.light}`}
                />
              );
            })}
          </Link>
          <div className={styles.footer__right}>
            <ul className={styles.footer__list}>
              <li className={styles.footer__item}>
                <strong className={styles.footer__subtitle}>
                  {lang === "ru" ? "Связаться с нами" : "Biz bilan bog'lanish"}
                </strong>
              </li>
              <li className={styles.footer__item}>
                {phoneInsta?.map((el) => {
                  return (
                    <div className={styles.footer__linkList} key={el._id}>
                      <a
                        className={styles.footer__tel}
                        href={`tel:+998${el.number}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          hanging={20}
                          viewBox="0 0 122.88 122.27"
                          fill="currentColor"
                        >
                          <path
                            fill="currentColor"
                            d="M33.84 50.25c4.13 7.45 8.89 14.6 15.07 21.12C55.11 77.93 62.82 83.9 72.8 89c.74.36 1.44.36 2.07.11.95-.36 1.92-1.15 2.87-2.1.74-.74 1.66-1.92 2.62-3.21 3.84-5.05 8.59-11.32 15.3-8.18.15.07.26.15.41.21l22.38 12.87c.07.04.15.11.21.15 2.95 2.03 4.17 5.16 4.2 8.71 0 3.61-1.33 7.67-3.28 11.1-2.58 4.53-6.38 7.53-10.76 9.51-4.17 1.92-8.81 2.95-13.27 3.61-7 1.03-13.56.37-20.27-1.69-6.56-2.03-13.17-5.38-20.39-9.84l-.53-.34c-3.31-2.07-6.89-4.28-10.4-6.89-12.84-9.7-25.93-23.71-34.46-39.13C2.35 50.95-1.55 36.98.58 23.67c1.18-7.3 4.31-13.94 9.77-18.32C15.11 1.51 21.52-.59 29.82.15c.95.07 1.8.62 2.25 1.44l14.35 24.26c2.1 2.72 2.36 5.42 1.21 8.12-.95 2.21-2.87 4.25-5.49 6.15-.77.66-1.69 1.33-2.66 2.03-3.21 2.33-6.86 5.02-5.61 8.18l-.03-.08z"
                          />
                        </svg>
                      </a>
                      <a
                        className={styles.footer__insta}
                        href={el.instagram}
                        target="blank"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={25}
                          height={25}
                          viewBox="0 0 50 50"
                          fill="currentColor"
                        >
                          <path
                            fill="currentColor"
                            d="M16 3C8.83 3 3 8.83 3 16v18c0 7.17 5.83 13 13 13h18c7.17 0 13-5.83 13-13V16c0-7.17-5.83-13-13-13H16zm21 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-12 3c6.07 0 11 4.93 11 11s-4.93 11-11 11-11-4.93-11-11 4.93-11 11-11zm0 2c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9z"
                          />
                        </svg>
                      </a>
                    </div>
                  );
                })}
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          {lang === "ru" ? (
            <span className={styles.footer__info}>
              <span>© 2024 Шаблон Аудио-Видео</span>{" "}
              <span>
                Создано <Link>Микромания</Link>
              </span>
            </span>
          ) : (
            <span className={styles.footer__info}>
              <span>© 2024 Audio-Video shabloni</span>{" "}
              <span>
                <Link>Micromania</Link> tomonidan yaratilgan
              </span>
            </span>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
