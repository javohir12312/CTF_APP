import React from "react";
import styles from "./Voices.module.scss";
import VoicesCard from "../VoicesCard/VoicesCard";

const Voices = React.memo(() => {
  return (
    <section className={styles.voices__section}>
      <div className="container">
        <VoicesCard check={false} />
      </div>
    </section>
  );
});

export default Voices;
