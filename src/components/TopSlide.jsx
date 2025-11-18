import React from "react";

export default function TopSlide({ onStart }) {
  return (
    <div className="slider">
      <div className="slides">
        <div className="slide active">
          <img
            src="/images/kokuban11.png"
            className="background"
            alt="背景"
          />
          <div className="overlay">
            <img src="/images/kanjinojikan.png" alt="タイトル" />
            <p className="tap-message" onClick={onStart}>
              この画面をタップしてね
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
