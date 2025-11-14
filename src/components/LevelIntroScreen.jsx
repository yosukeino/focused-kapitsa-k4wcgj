// src/components/LevelIntroScreen.jsx
import React, { useEffect } from "react";
import "../styles.css";

export default function LevelIntroScreen({ stage, onComplete }) {
  // ステージごとの背景とタイトル設定
  const getStageInfo = () => {
    switch (stage) {
      case 1:
        return {
          title: "🌿 レベル1：草原の章",
          background: "linear-gradient(to bottom, #56ab2f, #a8e063)",
        };
      case 2:
        return {
          title: "🏜️ レベル2：砂漠の章",
          background: "linear-gradient(to bottom, #f6d365, #fda085)",
        };
      case 3:
        return {
          title: "🌋 レベル3：火山の章",
          background: "linear-gradient(to bottom, #ff512f, #1f1c18)",
        };
      case "BOSS":
        return {
          title: "🐉 最終決戦：魔城の章",
          background: "linear-gradient(to bottom, #4b0082, #0d001a)",
        };
      default:
        return {
          title: "冒険の続き…",
          background: "linear-gradient(to bottom, #333, #000)",
        };
    }
  };

  const { title, background } = getStageInfo();

  // 数秒後にクイズ画面へ戻る
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3秒表示
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="level-intro-screen"
      style={{
        background,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        textAlign: "center",
        transition: "opacity 1s ease-in-out",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          textShadow: "0 0 10px black",
          marginBottom: "20px",
        }}
      >
        {title}
      </h1>
      <p style={{ fontSize: "1.5rem", opacity: 0.9 }}>冒険が続く...</p>
    </div>
  );
}
