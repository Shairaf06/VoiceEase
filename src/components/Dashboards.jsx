import React from "react";
import { initialRequests } from "../data.js";

function PageHeading({ eyebrow, title, subtitle, action }) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action && <div className="heading-action">{action}</div>}
    </div>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {action}
    </div>
  );
}

export function PatientDashboard({ onNavigate, onAction }) {
  return (
    <>
      <PageHeading
        eyebrow="THURSDAY, NOVEMBER 21"
        title={
          <>
            Good morning, Arjun <span className="wave">✳</span>
          </>
        }
        subtitle="Small steps count. Keep going."
        action={<span className="date-pill">☼ &nbsp; Your weekly rhythm</span>}
      />
      <div className="dashboard-grid">
        <div className="stack">
          <div className="welcome-card">
            <h2>You’re building confidence, one word at a time.</h2>
            <p>Your practice is yours. Take it at your own pace.</p>
            <span className="welcome-meta">
              A little practice goes a long way
            </span>
          </div>
          <div className="patient-hero">
            <article className="confidence-card glass-panel">
              <div className="card-heading">
                <span>Your confidence</span>
                <span className="level-badge">BEGINNER</span>
              </div>
              <div className="score-row">
                <div className="score-ring" style={{ "--score": 62 }}>
                  <span>
                    62<small>of 100</small>
                  </span>
                </div>
                <div className="score-copy">
                  <strong>Steady progress</strong>
                  <p>
                    You’re finding your rhythm. Keep showing up for yourself.
                  </p>
                </div>
              </div>
              <div className="confidence-foot">
                <span className="leaf">↗</span> Up 8 points this month
              </div>
            </article>
            <article className="practice-card glass-panel">
              <div className="practice-content">
                <div className="practice-top">
                  <span className="practice-icon">⌑</span> YOUR DAILY PRACTICE{" "}
                  <span className="language-inline">◉ &nbsp;English⌄</span>
                </div>
                <h3>A few minutes, just for you.</h3>
                <p>Read a short passage and notice what feels easier today.</p>
                <button
                  className="primary-button"
                  onClick={() => onNavigate("Practice")}
                >
                  Start today’s reading <span className="button-arrow">→</span>
                </button>
              </div>
            </article>
          </div>
          <article className="section-card upcoming-card session-list">
            <SectionHeader
              title="Your next session"
              action={
                <button
                  className="text-button"
                  onClick={() => onNavigate("Sessions")}
                >
                  See sessions →
                </button>
              }
            />
            <div className="session-item">
              <div className="session-date">
                21<small>NOV</small>
              </div>
              <div className="session-info">
                <strong>Dr. Priya Nair</strong>
                <small>Speech-Language Pathologist</small>
              </div>
              <div className="session-time">Thursday · 4:00 PM</div>
              <button
                className="outline-button"
                onClick={() => onAction("join-session")}
              >
                Session details
              </button>
            </div>
          </article>
        </div>
        <div className="stack">
          <article className="section-card">
            <SectionHeader title="Your practice this week" />
            <div className="progress-list">
              <div>
                <div className="progress-row">
                  <strong>Reading aloud</strong>
                  <span>3 of 4 days</span>
                </div>
                <div className="progress-bar">
                  <i style={{ width: "75%" }} />
                </div>
              </div>
              <div>
                <div className="progress-row">
                  <strong>Session attendance</strong>
                  <span>2 of 3 sessions</span>
                </div>
                <div className="progress-bar">
                  <i style={{ width: "67%" }} />
                </div>
              </div>
              <div>
                <div className="progress-row">
                  <strong>Practice minutes</strong>
                  <span>18 of 25 min</span>
                </div>
                <div className="progress-bar">
                  <i style={{ width: "72%" }} />
                </div>
              </div>
            </div>
            <button
              className="text-button"
              style={{ marginTop: 15 }}
              onClick={() => onNavigate("Progress")}
            >
              See your progress →
            </button>
          </article>
          <article className="section-card tip-card">
            <span className="tip-symbol">✳</span>
            <h3>There’s no wrong pace.</h3>
            <p>
              Pausing is part of speaking. Give yourself room to breathe, and
              continue when you’re ready.
            </p>
            <span className="tip-source">
              A gentle reminder from your VoiceEase team
            </span>
          </article>
          <article className="section-card">
            <SectionHeader
              title="Find a therapist"
              action={
                <button
                  className="text-button"
                  onClick={() => onNavigate("Find an SLP")}
                >
                  Browse →
                </button>
              }
            />
            <p className="muted-copy">
              Explore speech-language pathologists who work with the goals and
              language that matter to you.
            </p>
            <button
              className="outline-button"
              style={{ marginTop: 13 }}
              onClick={() => onNavigate("Find an SLP")}
            >
              Explore SLPs <span className="button-arrow">→</span>
            </button>
          </article>
        </div>
      </div>
    </>
  );
}

function Metric({ label, value, note, icon, variant = "" }) {
  return (
    <article className={`metric-card glass-panel ${variant}`}>
      <div className="metric-top">
        <span>{label}</span>
        <span className="metric-icon">{icon}</span>
      </div>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

function RequestRow({ request, index, onAction }) {
  return (
    <div className="request-row">
      <div className="request-person">
        <span className={`avatar ${index === 1 ? "avatar-sage" : ""}`}>
          {request.initials}
        </span>
        <span>
          <strong>{request.name}</strong>
          <small>{request.detail}</small>
        </span>
      </div>
      <div className="request-actions">
        <button
          className="accept-button"
          onClick={() => onAction("accept-request", index)}
        >
          Accept
        </button>
        <button
          className="mini-button"
          onClick={() => onAction("view-request", index)}
        >
          Review
        </button>
      </div>
    </div>
  );
}

function ProgressChart({ onNavigate }) {
  return (
    <article className="section-card chart-card">
      <SectionHeader
        title="Patient progress"
        action={
          <button
            className="text-button"
            onClick={() => onNavigate("My patients")}
          >
            Patient details →
          </button>
        }
      />
      <p className="muted-copy chart-subtitle">
        Average confidence score across active patients
      </p>
      <div className="chart-area">
        <svg
          viewBox="0 0 500 120"
          role="img"
          aria-label="Patient confidence scores trending upward over five months"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#65ad91" stopOpacity=".25" />
              <stop offset="1" stopColor="#65ad91" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="chart-grid" d="M0 25H500M0 60H500M0 95H500" />
          <path
            className="chart-fill"
            d="M8 91 110 76 210 69 320 48 420 39 492 24 492 110H8Z"
          />
          <path
            className="chart-line"
            d="m8 91 102-15 100-7 110-21 100-9 72-15"
          />
          {[
            [8, 91],
            [110, 76],
            [210, 69],
            [320, 48],
            [420, 39],
            [492, 24],
          ].map(([cx, cy]) => (
            <circle key={cx} className="chart-dot" cx={cx} cy={cy} r="4" />
          ))}
        </svg>
      </div>
      <div className="chart-labels">
        <span>JUL</span>
        <span>AUG</span>
        <span>SEP</span>
        <span>OCT</span>
        <span>NOV</span>
      </div>
      <div className="chart-summary">
        <strong>+12 points</strong>
        <span>↑ average change this quarter</span>
      </div>
    </article>
  );
}

export function SlpDashboard({ requestCount, onAction, onNavigate }) {
  const visibleRequests = initialRequests.slice(0, requestCount);
  return (
    <>
      <PageHeading
        eyebrow="THURSDAY, NOVEMBER 21"
        title="Your practice at a glance"
        subtitle="Welcome back, Dr. Priya. Here’s what’s happening today."
        action={<span className="date-pill">▦ &nbsp; This week⌄</span>}
      />
      <div className="stat-grid">
        <Metric
          label="Active patients"
          value="12 / 15"
          note="80% of your capacity"
          icon="♧"
        />
        <Metric
          label="New requests"
          value={requestCount}
          note="Ready for your review"
          icon="▤"
          variant="accent-warm"
        />
        <Metric
          label="Sessions today"
          value="4"
          note="Next one at 11:30 AM"
          icon="▦"
          variant="accent-blue"
        />
      </div>
      <div className="slp-dashboard-grid">
        <div className="stack">
          <article className="section-card">
            <SectionHeader
              title={`Patient requests (${requestCount})`}
              action={
                <button
                  className="text-button"
                  onClick={() => onNavigate("Requests")}
                >
                  View all →
                </button>
              }
            />
            {visibleRequests.length ? (
              visibleRequests.map((request, index) => (
                <RequestRow
                  key={request.name}
                  request={request}
                  index={index}
                  onAction={onAction}
                />
              ))
            ) : (
              <div className="empty-card">
                <p>No requests waiting right now.</p>
              </div>
            )}
          </article>
          <ProgressChart onNavigate={onNavigate} />
        </div>
        <div className="stack">
          <article className="section-card">
            <SectionHeader
              title="Today’s schedule"
              action={
                <button
                  className="text-button"
                  onClick={() => onNavigate("Schedule")}
                >
                  Full schedule →
                </button>
              }
            />
            <div className="schedule-rows">
              <div className="schedule-row">
                <time>10:00 AM</time>
                <span>
                  <strong>Arjun Sharma</strong>
                  <small>Follow-up session</small>
                </span>
                <span className="status-pill">Completed</span>
              </div>
              <div className="schedule-row">
                <time>11:30 AM</time>
                <span>
                  <strong>Meera Nair</strong>
                  <small>Fluency practice</small>
                </span>
                <span className="status-pill">Next up</span>
              </div>
              <div className="schedule-row">
                <time>2:00 PM</time>
                <span>
                  <strong>Karan Mehta</strong>
                  <small>Initial consultation</small>
                </span>
                <span className="status-pill">Upcoming</span>
              </div>
            </div>
          </article>
          <article className="section-card">
            <SectionHeader title="Your patient capacity" />
            <div className="capacity-line">
              <span>Active patients</span>
              <strong>12 of 15</strong>
            </div>
            <div className="capacity-progress">
              <span />
            </div>
            <p className="muted-copy capacity-copy">
              You have room for 3 more patients. Update your availability
              anytime.
            </p>
            <button
              className="text-button"
              onClick={() => onAction("capacity")}
            >
              Manage availability →
            </button>
          </article>
        </div>
      </div>
    </>
  );
}
