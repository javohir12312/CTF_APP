import React from "react";
import styles from "./Voices.module.scss";
import VoicesCard from "../VoicesCard/VoicesCard";
import { useSelector } from "react-redux";

const Voices = React.memo(() => {
  const { lang } = useSelector((state) => state.lang);
  const { themeList } = useSelector((state) => state.theme);
  return (
    <section className={styles.voices__section}>
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
        <VoicesCard check={false} />
      </div>
    </section>
  );
});

export default Voices;
