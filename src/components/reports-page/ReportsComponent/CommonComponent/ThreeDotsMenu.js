import React from "react";

const ThreeDotsMenu = () => {
  return (
    <div style={styles.container}>
      <div style={styles.dot}></div>
      <div style={styles.dot}></div>
      <div style={styles.dot}></div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    width: "20px",
  },
  dot: {
    width: "3px",
    height: "3px",
    background: "#000000 0% 0% no-repeat padding-box",
    borderRadius: "50%",
    margin: "3px 0",
  },
};

export default ThreeDotsMenu;
