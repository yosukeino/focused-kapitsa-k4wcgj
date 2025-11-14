// src/components/Quiz.jsx
import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Lives from "./Lives";
import Enemy from "./Enemy";
import LoadingScreen from "./LoadingScreen";
import ConfirmGiveUp from "./ConfirmGiveUp";
import TimeoutScreen from "./TimeoutScreen";
import QuestionCounter from "./QuestionCounter";
import ActionButtons from "./ActionButtons";
import MessageDisplay from "./MessageDisplay";
import LevelIntroScreen from "./LevelIntroScreen";
import GameOverOverlay from "./GameOverOverlay";
import allQuestions from "./questions";
import "../styles.css";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz({ level, questionCount, timeLimit, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(null);
  const [answer, setAnswer] = useState("");
  const [lives, setLives] = useState(3);
  const [result, setResult] = useState("");
  const [messageType, setMessageType] = useState("");
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [skipUsed, setSkipUsed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTimeout, setShowTimeout] = useState(false);
  const [lastAnswer, setLastAnswer] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [warning, setWarning] = useState("");
  const [stage, setStage] = useState(1);
  const [showLevelIntro, setShowLevelIntro] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  // 初期化
  useEffect(() => {
    const filtered = allQuestions.filter((q) => q.level === level);
    setQuestions(shuffle(filtered).slice(0, questionCount));
  }, [level, questionCount]);

  useEffect(() => {
    if (questions.length > 0 && !current) nextQuestion(false);
  }, [questions]);

  // ステージ判定
  const getLevelStage = (index) => {
    // 最後の問題はBOSS
    if (index === questionCount - 1) return "BOSS";

    if (questionCount <= 7) return Math.min(3, Math.floor(index / 2) + 1);
    if (questionCount <= 10) return Math.min(3, Math.floor(index / 3) + 1);
    if (questionCount <= 16) return Math.min(3, Math.floor(index / 5) + 1);
    return 3;
  };

  useEffect(() => {
    const newStage = getLevelStage(questionNumber - 1);
    setStage(newStage);
  }, [questionNumber, questionCount]);

  useEffect(() => {
    setShowLevelIntro(true);
    const timer = setTimeout(() => {
      setShowLevelIntro(false);
      setTimeLeft(timeLimit);
    }, 3000);
    return () => clearTimeout(timer);
  }, [stage, timeLimit]);

  const getBackgroundStyle = () => {
    switch (stage) {
      case 1:
        return { background: "linear-gradient(to bottom, #56ab2f, #a8e063)" };
      case 2:
        return { background: "linear-gradient(to bottom, #f6d365, #fda085)" };
      case 3:
        return { background: "linear-gradient(to bottom, #ff512f, #1f1c18)" };
      case "BOSS":
        return { background: "linear-gradient(to bottom, #4b0082, #0d001a)" };
      default:
        return { background: "#000" };
    }
  };

  useEffect(() => {
    if (!current || showTimeout || showConfirm || showLevelIntro || isGameOver)
      return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [current, showTimeout, showConfirm, showLevelIntro, isGameOver]);

  const nextQuestion = (countUp = true) => {
    if (questions.length === 0) {
      setResult("🎉 全問終了！お疲れさまでした 🎉");
      setMessageType("info");
      setCurrent(null);
      return;
    }
    const [q, ...rest] = questions;
    setQuestions(rest);
    setCurrent(q);
    setAnswer("");
    setResult("");
    setWarning("");
    setMessageType("");
    setTimeLeft(timeLimit);
    if (countUp) setQuestionNumber((prev) => prev + 1);
  };

  const checkAnswer = () => {
    if (!current) return;
    const ans = answer.trim();
    if (/^[a-zA-Z]+$/.test(ans)) {
      setWarning("⚠️ ひらがなやカタカナで入力してください！");
      setResult("");
      setMessageType("warning");
      setAnswer("");
      return;
    }

    const readings = current.reading
      .replace(/、/g, ",")
      .split(",")
      .map((r) => r.trim());

    const isNearMatch = (input, correct) => {
      if (input === correct) return false;
      if (Math.abs(input.length - correct.length) > 1) return false;
      let diff = 0,
        i = 0,
        j = 0;
      while (i < input.length && j < correct.length) {
        if (input[i] !== correct[j]) {
          diff++;
          if (diff > 1) return false;
          if (input.length > correct.length) i++;
          else if (input.length < correct.length) j++;
          else {
            i++;
            j++;
          }
        } else {
          i++;
          j++;
        }
      }
      if (i < input.length || j < correct.length) diff++;
      return diff === 1;
    };

    if (readings.includes(ans)) {
      setResult("✅ 正解！");
      setMessageType("success");
      setWarning("");
      setTimeout(() => nextQuestion(true), 1000);
    } else if (readings.some((r) => isNearMatch(ans, r))) {
      setResult("🤏 おしい！あと少し！");
      setMessageType("near");
      setWarning("");
      setAnswer("");
    } else {
      setResult("❌ 間違い！もう一度！");
      setMessageType("error");
      setAnswer("");
    }
  };

  const handleTimeout = () => {
    if (!current) return;
    setLastAnswer(current.reading);
    setShowTimeout(true);
  };

  const handleNextAfterTimeout = () => {
    setShowTimeout(false);
    const newLives = lives - 1;
    setLives(newLives);
    setResult(`❌ 時間切れ！（残り${newLives}機）`);
    setMessageType("error");
    if (newLives <= 0) {
      setTimeout(() => setIsGameOver(true), 800);
      return;
    }
    setTimeout(() => nextQuestion(false), 800);
  };

  const skipQuestion = () => {
    if (skipUsed || !current) return;
    setSkipUsed(true);
    setResult("🔁 問題を入れ替えました！");
    setMessageType("info");
    setTimeout(() => nextQuestion(false), 1000);
  };

  const handleGiveUp = () => setShowConfirm(true);
  const confirmGiveUp = (choice) => {
    if (choice === "yes") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onBack();
      }, 1000);
    } else setShowConfirm(false);
  };

  if (loading) return <LoadingScreen message="終了しています..." />;
  if (showConfirm) return <ConfirmGiveUp onConfirm={confirmGiveUp} />;
  if (showLevelIntro)
    return (
      <LevelIntroScreen
        stage={stage}
        onComplete={() => setShowLevelIntro(false)}
      />
    );

  if (!current)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          ...getBackgroundStyle(),
          minHeight: "100vh",
        }}
      >
        <h2 style={{ color: "white", textShadow: "0 0 5px black" }}>
          {result || "ゲーム終了！"}
        </h2>
        <button onClick={onBack} style={{ marginTop: "20px" }}>
          ← 最初に戻る
        </button>
      </div>
    );

  return (
    <div className="quiz-root" style={{ position: "relative" }}>
      <div className="lives-container">
        <Lives lives={lives} />
      </div>
      <QuestionCounter current={questionNumber} total={questionCount} />
      <div className="quiz-mode" style={getBackgroundStyle()}>
        <div className="quiz-card">
          <Enemy visible={level === "easy"} />
          <Timer timeLeft={timeLeft} />
          <div className="question-text">{current.kanji}</div>
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="ひらがなで答えてね"
            className="answer-input"
            readOnly={showTimeout || isGameOver}
          />
          <MessageDisplay message={warning || result} type={messageType} />
          <ActionButtons
            onAnswer={checkAnswer}
            onSwap={skipQuestion}
            onGiveUp={handleGiveUp}
            disabled={skipUsed}
          />
        </div>
      </div>
      {showTimeout && (
        <TimeoutScreen
          correctAnswer={lastAnswer}
          onNext={handleNextAfterTimeout}
        />
      )}
      {isGameOver && <GameOverOverlay onBack={onBack} />}
    </div>
  );
}
