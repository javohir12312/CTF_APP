import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const MenuButton = (props) => {
  const { themeList } = useSelector((state) => state.theme);
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClick = () => {
    setOpen(!open);
  };

  const styles = {
    container: {
      height: "32px",
      width: "32px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      padding: "4px",
    },
    line: {
      height: "2px",
      width: "20px",
      background: themeList ? "#403D39" : "#CED4DA",
      transition: "all 0.2s ease",
    },
    lineTop: {
      transform: open ? "rotate(45deg)" : "none",
      transformOrigin: "top left",
      marginBottom: "5px",
    },
    lineMiddle: {
      opacity: open ? 0 : 1,
      transform: open ? "translateX(-16px)" : "none",
    },
    lineBottom: {
      transform: open ? "translateX(-1px) rotate(-45deg)" : "none",
      transformOrigin: "top left",
      marginTop: "5px",
    },
  };

  return (
    <div
      style={styles.container}
      onClick={props.onClick ? props.onClick : handleClick}
    >
      <div style={{ ...styles.line, ...styles.lineTop }} />
      <div style={{ ...styles.line, ...styles.lineMiddle }} />
      <div style={{ ...styles.line, ...styles.lineBottom }} />
    </div>
  );
};

export default MenuButton;
