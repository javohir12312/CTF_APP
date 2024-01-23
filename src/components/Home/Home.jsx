import React from "react";
import Hero from "../Hero/Hero";
import VoicesCard from "../VoicesCard/VoicesCard";

const Home = () => {
  return (
    <>
      <Hero />
      <section>
        <div className="container">
          <VoicesCard check={true} />
        </div>
      </section>
    </>
  );
};

export default Home;
