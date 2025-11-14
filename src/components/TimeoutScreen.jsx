import React from "react";

export default function TimeoutScreen({ correctAnswer, onNext }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(20,20,20,0.85)",
          color: "white",
          padding: "40px 60px",
          borderRadius: "20px",
          textAlign: "center",
          border: "2px solid #f8b400",
          boxShadow: "0 0 20px rgba(248,180,0,0.5)",
        }}
      >
        <h2 style={{ marginBottom: "15px", fontSize: "1.8rem" }}>
          ⏰ タイムアップ！
        </h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
          正解は{" "}
          <span style={{ color: "#f8b400", fontWeight: "bold" }}>
            {correctAnswer}
          </span>
        </p>
        <button
          onClick={onNext}
          style={{
            padding: "10px 25px",
            fontSize: "1rem",
            borderRadius: "10px",
            border: "none",
            background: "#f8b400",
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#ffd34d")}
          onMouseOut={(e) => (e.target.style.background = "#f8b400")}
        >
          次の問題へ →
        </button>
      </div>
    </div>
  );
}
