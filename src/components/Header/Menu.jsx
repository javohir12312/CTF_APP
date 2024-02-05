import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Menu = (props) => {
  const { themeList } = useSelector((state) => state.theme);
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const styles = {
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      height: open ? "100vh" : 0,
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      background: themeList ? "#FFFCF2" : "#212529",
      opacity: 0.95,
      transition: "height 0.3s ease",
      zIndex: 98,
    },
    menuList: {
      paddingTop: "3rem",
    },
  };

  return (
    <div style={styles.container}>
      {open ? <div style={styles.menuList}>{props.children}</div> : null}
    </div>
  );
};

export default Menu;
