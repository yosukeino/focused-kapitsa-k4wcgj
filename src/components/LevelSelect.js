import React from "react";

export default function LevelSelect({ onSelect }) {
  const levels = [
    { id: "easy", label: "初級", img: "/images/初.jpg" },
    { id: "normal", label: "中級", img: "/images/中.jpg" },
    { id: "hard", label: "上級", img: "/images/上.jpg" },
    { id: "expert", label: "超級", img: "/images/超.jpg" },
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2
        style={{
          color: "white",
          textShadow: "0 0 5px black",
          marginBottom: "30px",
        }}
      >
        難易度を選んでください
      </h2>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          width: "800px", // 親コンテナの幅を固定
        }}
      >
        {levels.map((lvl) => (
          <img
            key={lvl.id}
            src={lvl.img}
            alt={lvl.label}
            onClick={() => onSelect(lvl.id)}
            style={{
              width: "180px",
              height: "auto",
              cursor: "pointer",
              borderRadius: "12px",
              boxShadow: "0 0 5px rgba(0,0,0,0.5)",
              transition: "transform 0.25s, box-shadow 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 0 20px gold";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 5px rgba(0,0,0,0.5)";
            }}
          />
        ))}
      </div>
    </div>
  );
}
