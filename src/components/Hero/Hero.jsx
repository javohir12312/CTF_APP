import React from "react";
import styles from "./Hero.module.scss";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { Forimage } from "../../server/api";

const Hero = () => {
  const { themeList } = useSelector((state) => state.theme);
  const { lang } = useSelector((state) => state.lang);
  const { heroList } = useSelector((state) => state.hero);

  return (
    <>
      {heroList !== undefined ? (
        heroList.map((el) => {
          return (
            <section
              className={
                themeList ? styles.hero__section : styles.hero__sectionDark
              }
              key={el[`${lang}`]._id}
            >
              <div className="container">
                <div className={styles.hero__boxTop}>
                  <div className={styles.hero__left}>
                    <h2 className={styles.hero__title}>
                      {el[`${lang}`].title}
                    </h2>
                    <p className={styles.hero__text}>
                      {el[`${lang}`].description}
                    </p>
                    <Link to={"about"} className={styles.hero__btn}>
                      MORE...
                    </Link>
                  </div>
                  <img
                    className={styles.hero__image}
                    width={368}
                    height={368}
                    src={`${Forimage}${el[`${lang}`].image}`}
                    alt="image"
                  />
                </div>
              </div>
            </section>
          );
        })
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Hero;
