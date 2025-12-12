import React from "react";
import "../styles.css";

export default function GameClearScreen({ onBack }) {
  return (
    <div style={styles.root}>
      <h1 style={styles.title}>🎉 GAME CLEAR! 🎉</h1>

      <button style={styles.button} onClick={onBack}>
        ← 最初に戻る
      </button>
    </div>
  );
}

const styles = {
  root: {
    width: "100vw",
    height: "100vh",
    background: "#fff", // ← 透けないように白で完全塗りつぶし
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999, // どこよりも前
  },
  title: {
    fontSize: "52px",
    color: "#222",
    textShadow: "0 0 5px #fff",
    marginBottom: "40px",
  },
  button: {
    padding: "14px 30px",
    fontSize: "20px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
