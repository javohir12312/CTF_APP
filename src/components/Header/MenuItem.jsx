import React, { useState } from "react";

const MenuItem = (props) => {
  const [hover, setHover] = useState(false);
  const handleHover = () => {
    setHover(!hover);
  };

  const styles = {
    container: {
      opacity: 0,
      animation: "1s appear forwards",
      animationDelay: props.delay,
    },
    menuItem: {
      fontSize: "1.2rem",
      padding: "1rem 0",
      margin: "2.5rem 5% 0",
      cursor: "pointer",
      color: hover ? "gray" : "#fafafa",
      transition: "color 0.2s ease-in-out",
      animation: "0.5s slideIn forwards",
      animationDelay: props.delay,
    },
  };

  return (
    <div style={styles.container}>
      <div
        style={styles.menuItem}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    </div>
  );
};

export default MenuItem;
