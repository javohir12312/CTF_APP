import React from "react";
import styles from "./Home.module.scss";
import Hero from "../Hero/Hero";
import VoicesCard from "../VoicesCard/VoicesCard";
import { useSelector } from "react-redux";

const Home = () => {
  const { lang } = useSelector((state) => state.lang);
  const { themeList } = useSelector((state) => state.theme);
  return (
    <>
      <Hero />
      <section className={styles.voices}>
        <div className="container">
          <h2
            className={`${styles.title} ${
              themeList ? styles.light : styles.dark
            }`}
          >
            {lang === "ru"
              ? "Актеры озвучивания и актрисы"
              : "Ovoz aktyorlari va aktrisalari"}
          </h2>
          <VoicesCard check={true} />
        </div>
      </section>
    </>
  );
};

export default Home;
