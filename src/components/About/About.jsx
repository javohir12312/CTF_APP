import React from "react";
import styles from "./About.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const About = () => {
  const { lang } = useSelector((state) => state.lang);
  const { themeList } = useSelector((state) => state.theme);

  return (
    <section
      className={`${styles.about} ${
        themeList ? styles.about__light : styles.about__dark
      }`}
    >
      <div className="container">
        <div className={styles.about__box}>
          <h2 className={styles.about__title}>
            {lang === "ru"
              ? "Эта страница находится в разработке"
              : "Bu saxifa ishlab chiqish jarayonida"}
          </h2>
          <Link className={styles.about__btn} to={"/"}>
            {lang === "ru" ? "Домашняя страница" : "Bosh saxifa"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
