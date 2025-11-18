import React from "react";

export default function TimeSelect({ onSelect, onBack }) {
  const times = [30, 15];

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        minHeight: "100vh",
        backgroundImage: `url("/images/kokuban15.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 style={{ color: "white", textShadow: "0 0 5px black" }}>
        制限時間を選んでください
      </h2>
      {times.map((t) => (
        <button
          key={t}
          onClick={() => onSelect(t)}
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {t} 秒
        </button>
      ))}
      <div>
        <button
          onClick={onBack}
          style={{
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          ← 戻る
        </button>
      </div>
    </div>
  );
}
