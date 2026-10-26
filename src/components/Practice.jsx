import React, { useEffect, useState } from "react";

export default function Practice({ onNavigate, toast }) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!recording) return undefined;
    const timer = window.setInterval(
      () => setSeconds((current) => current + 1),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [recording]);

  const togglePractice = () => {
    if (!recording) {
      setSeconds(0);
      setRecording(true);
      toast("Practice started. Take your time.");
    } else {
      setRecording(false);
      toast("Practice complete. Thank you for showing up.");
    }
  };
  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR PRACTICE</p>
          <h1>A moment to find your rhythm</h1>
          <p>
            Choose a language, take a breath, and practise at a pace that feels
            comfortable.
          </p>
        </div>
      </div>
      <div className="practice-layout">
        <section className="practice-intro glass-panel">
          <p className="eyebrow">TODAY’S READING · 5 MINUTES</p>
          <h1>There’s no rush.</h1>
          <p>
            Read the passage aloud, silently, or listen first. You can pause
            whenever you need. This is a space to practise, not to perform.
          </p>
          <div className="prompt-card">
            <div className="prompt-top">
              <span>SHORT REFLECTION · ENGLISH</span>
              <button
                className="icon-button"
                onClick={() =>
                  toast(
                    "Audio reading will be available when speech playback is connected.",
                  )
                }
                aria-label="Read passage aloud"
              >
                ◖))
              </button>
            </div>
            <blockquote>
              “Each day gives us a <span>new chance</span> to share our
              thoughts. We can take a breath, find our words, and speak in our
              own time.”
            </blockquote>
            <div className="prompt-controls">
              <button
                className={`record-button ${recording ? "is-recording" : ""}`}
                onClick={togglePractice}
              >
                <span className="record-dot" />
                {recording ? "Finish practice" : "Begin speaking"}
              </button>
              <button
                className="outline-button"
                onClick={() =>
                  toast(
                    "Audio reading will be available when speech playback is connected.",
                  )
                }
              >
                ⌁ &nbsp; Listen to passage
              </button>
              <select className="filter-select" aria-label="Practice language">
                <option>English</option>
                <option>हिन्दी</option>
                <option>தமிழ்</option>
                <option>বাংলা</option>
              </select>
            </div>
          </div>
        </section>
        <div className="practice-side">
          <article className="section-card timer-card">
            <p className="eyebrow">A GENTLE CHECK-IN</p>
            <div className="timer">{time}</div>
            <p className="recording-state">
              {recording
                ? "Take your time. You’re doing great."
                : "Whenever you feel ready"}
            </p>
            <button
              className={`record-button ${recording ? "is-recording" : ""}`}
              onClick={togglePractice}
            >
              <span className="record-dot" />
              {recording ? "Finish practice" : "Start a practice"}
            </button>
            <p className="practice-disclaimer">
              This demo does not record or upload audio. Speech feedback will be
              added with a speech analysis service.
            </p>
          </article>
          <article className="section-card practice-note">
            <h3>Remember</h3>
            <p>
              Your pace is your own. Pauses and restarts are a natural part of
              communication. This practice is for noticing what feels
              comfortable, without judging how you speak.
            </p>
          </article>
          <article className="section-card practice-note">
            <h3>Your latest check-in</h3>
            <p>
              You practised for 4 minutes yesterday. Consistency matters more
              than perfection.
            </p>
            <button
              className="text-button"
              style={{ marginTop: 8 }}
              onClick={() => onNavigate("Progress")}
            >
              View your progress →
            </button>
          </article>
        </div>
      </div>
    </>
  );
}
