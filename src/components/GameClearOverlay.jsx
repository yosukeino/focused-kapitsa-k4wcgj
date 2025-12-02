import React from "react";
import "../styles.css";

export default function GameClearOverlay({ onBack }) {
  return (
    <div className="overlay-root" style={styles.root}>
      <h1 style={styles.title}>🎉 GAME CLEAR! 🎉</h1>

      <button style={styles.button} onClick={onBack}>
        ← 最初に戻る
      </button>
    </div>
  );
}

const styles = {
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(255,255,255,0.85)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3000,
  },
  title: {
    fontSize: "48px",
    color: "#333",
    textShadow: "0 0 10px white",
    marginBottom: "40px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "20px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
