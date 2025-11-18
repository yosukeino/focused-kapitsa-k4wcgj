import React from "react";

export default function LevelSelect({ onSelect }) {
  const levels = [
    { id: "easy", label: "初級" },
    { id: "normal", label: "中級" },
    { id: "hard", label: "上級" },
    { id: "expert", label: "超級" },
  ];

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        minHeight: "100vh",
        backgroundImage: `url("/images/kokuban13.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 style={{ color: "white", textShadow: "0 0 5px black" }}>
        難易度を選んでください
      </h2>
      {levels.map((lvl) => (
        <button
          key={lvl.id}
          onClick={() => onSelect(lvl.id)}
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {lvl.label}
        </button>
      ))}
    </div>
  );
}
