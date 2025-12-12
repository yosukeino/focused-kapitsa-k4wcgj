// src/components/QuestionCounter.jsx
import React from "react";
import "../styles.css";

export default function QuestionCounter({ current, total }) {
  const visibleCount = 7; // 表示する幅（固定）
  const scrollStart = 5;  // 何問目からスクロール開始するか

  // 左端インデックスを決定
  let startIndex = 0;
  if (current >= scrollStart) {
    startIndex = current - scrollStart;
  }

  const visibleSteps = [...Array(total)].slice(startIndex, startIndex + visibleCount);

  return (
    <div className="map-progress">
      <div className="map-bar">
        {visibleSteps.map((_, i) => {
          const stepIndex = startIndex + i; // 全体のインデックス
          return (
            <div key={stepIndex} className="map-step">
              {stepIndex === 0 && <div className="castle-icon">🏰</div>}
              {stepIndex === total - 1 && <div className="dragon-icon">🐉</div>}
              {stepIndex === current - 1 && <div className="player-icon">🧙‍♂️</div>}

              <div className={`step-circle ${stepIndex < current ? "active" : ""}`}>
                {stepIndex + 1}
              </div>

              {stepIndex < total - 1 && (
                <div
                  className={`step-line ${stepIndex < current - 1 ? "filled" : ""}`}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
