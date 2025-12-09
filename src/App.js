import React, { useState } from "react";
import TopSlide from "./components/TopSlide";
import StartMenu from "./components/StartMenu";
import HowToPlay from "./components/HowToPlay";
import LevelSelect from "./components/LevelSelect";
import QuestionCount from "./components/QuestionCount";
import TimeSelect from "./components/TimeSelect";
import WaitScreen from "./components/WaitScreen";
import Quiz from "./components/Quiz";
import BgmSelect from "./components/BgmSelect"; // ← ★追加
import "./styles.css";

export default function App() {
  const [page, setPage] = useState("top");
  const [level, setLevel] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [timeLimit, setTimeLimit] = useState(30);

  // 🎵 ★ 現在選択されている BGM 名（通常ステージ用）
  const [bgm, setBgm] = useState("normal1");

  return (
    <div className="App">
      {page === "top" && <TopSlide onStart={() => setPage("startMenu")} />}

      {/* StartMenu */}
      {page === "startMenu" && (
        <StartMenu
          onSelect={(target) => {
            if (target === "level") setPage("level");
            if (target === "howto") setPage("howto");
            if (target === "bgm") setPage("bgm"); // ← ★ジュークボックス
          }}
        />
      )}

      {/* 遊び方 */}
      {page === "howto" && <HowToPlay onBack={() => setPage("startMenu")} />}

      {/* BGM設定ページ */}
      {page === "bgm" && (
        <BgmSelect
          currentBgm={bgm}
          onSave={(newBgm) => {
            setBgm(newBgm); // ★保存
            setPage("startMenu");
          }}
          onBack={() => setPage("startMenu")}
        />
      )}

      {/* レベル選択 */}
      {page === "level" && (
        <LevelSelect
          onSelect={(lvl) => {
            setLevel(lvl);
            setPage("count");
          }}
          onBack={() => setPage("startMenu")}
        />
      )}

      {/* 問題数 */}
      {page === "count" && (
        <QuestionCount
          onSelect={(count) => {
            setQuestionCount(count);
            setPage("time");
          }}
          onBack={() => setPage("level")}
        />
      )}

      {/* 制限時間 */}
      {page === "time" && (
        <TimeSelect
          onSelect={(time) => {
            setTimeLimit(time);
            setPage("wait");
          }}
          onBack={() => setPage("count")}
        />
      )}

      {/* 開始前 */}
      {page === "wait" && (
        <WaitScreen
          level={level}
          questionCount={questionCount}
          timeLimit={timeLimit}
          onStart={() => setPage("quiz")}
          onBack={() => setPage("time")}
        />
      )}

      {/* クイズ */}
      {page === "quiz" && (
        <Quiz
          level={level}
          questionCount={questionCount}
          timeLimit={timeLimit}
          bgm={bgm} // ★選択されたBGMを渡す
          onBack={() => setPage("level")}
        />
      )}
    </div>
  );
}
