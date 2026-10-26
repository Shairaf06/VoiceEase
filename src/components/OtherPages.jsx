import React from "react";

function Heading({ eyebrow, title, subtitle, action }) {
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
function Chart() {
  return (
    <div className="chart-area">
      <svg
        viewBox="0 0 500 120"
        role="img"
        aria-label="Confidence scores trending upward"
      >
        <path className="chart-grid" d="M0 25H500M0 60H500M0 95H500" />
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
        ].map(([x, y]) => (
          <circle key={x} className="chart-dot" cx={x} cy={y} r="4" />
        ))}
      </svg>
    </div>
  );
}

export default function OtherPages({
  section,
  role,
  requests,
  onNavigate,
  onAction,
  sessionFilter,
  setSessionFilter,
}) {
  const isSLP = role === "slp";
  if (section === "Sessions" || section === "Schedule") {
    return (
      <>
        <Heading
          eyebrow={isSLP ? "YOUR CALENDAR" : "CARE & CONNECTION"}
          title={isSLP ? "Schedule" : "Your sessions"}
          subtitle={
            isSLP
              ? "A calm view of who you’re meeting and when."
              : "Your sessions are a space to work together at your pace."
          }
          action={
            <button
              className="primary-button"
              onClick={() => onAction("book-session")}
            >
              ＋ &nbsp; Request a session
            </button>
          }
        />
        <div className="tab-row">
          {["Upcoming", "Past", "Cancelled"].map((filter) => (
            <button
              key={filter}
              className={`tab-button ${sessionFilter === filter ? "is-active" : ""}`}
              onClick={() => setSessionFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="stack">
          <article className="section-card">
            <SectionHeader
              title={
                sessionFilter === "Upcoming" ? "Coming up" : "Recent sessions"
              }
            />
            <div className="session-item">
              <div className="session-date">
                21<small>NOV</small>
              </div>
              <div className="session-info">
                <strong>{isSLP ? "Arjun Sharma" : "Dr. Priya Nair"}</strong>
                <small>
                  {isSLP
                    ? "Fluency practice · 30 minutes"
                    : "Speech-Language Pathologist · 30 minutes"}
                </small>
              </div>
              <div className="session-time">Thursday · 4:00 PM</div>
              <button
                className="outline-button"
                onClick={() => onAction("join-session")}
              >
                View details
              </button>
            </div>
          </article>
          <article className="section-card">
            <SectionHeader title="A note about sessions" />
            <p className="muted-copy">
              Sessions are collaborative. Your SLP will work with you to set
              goals that feel meaningful and achievable.
            </p>
          </article>
        </div>
      </>
    );
  }

  if (section === "Requests") {
    return (
      <>
        <Heading
          eyebrow="INBOX"
          title="Consultation requests"
          subtitle="Review requests and connect with people seeking support."
        />
        <article className="section-card">
          <SectionHeader
            title={`Waiting for your review (${requests.length})`}
          />
          {requests.length ? (
            requests.map((request, index) => (
              <div className="request-row" key={request.name}>
                <div className="request-person">
                  <span className="avatar">{request.initials}</span>
                  <span>
                    <strong>{request.name}</strong>
                    <small>
                      {request.detail} · {request.time}
                    </small>
                  </span>
                </div>
                <div className="request-actions">
                  <button
                    className="accept-button"
                    onClick={() => onAction("accept-request", index)}
                  >
                    Accept request
                  </button>
                  <button
                    className="mini-button"
                    onClick={() => onAction("view-request", index)}
                  >
                    Review
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-card">
              <div className="empty-icon">✳</div>
              <h2>You’re all caught up.</h2>
              <p>New consultation requests will appear here.</p>
            </div>
          )}
        </article>
      </>
    );
  }

  if (section === "My patients") {
    const patients = [
      [
        "AS",
        "Arjun Sharma",
        "Fluency practice · English · Beginner",
        "62 / 100",
      ],
      [
        "MN",
        "Meera Nair",
        "Confidence building · Tamil · Intermediate",
        "74 / 100",
      ],
      [
        "KM",
        "Karan Mehta",
        "Everyday conversations · Hindi · Beginner",
        "51 / 100",
      ],
    ];
    return (
      <>
        <Heading
          eyebrow="YOUR CARE TEAM"
          title="My patients"
          subtitle="A supportive overview of the people you work with."
        />
        <article className="section-card">
          <SectionHeader title="Active patients" />
          {patients.map(([initials, name, detail, score]) => (
            <div className="request-row" key={name}>
              <div className="request-person">
                <span className="avatar">{initials}</span>
                <span>
                  <strong>{name}</strong>
                  <small>{detail}</small>
                </span>
              </div>
              <div className="request-actions">
                <span className="status-pill">{score}</span>
                <button
                  className="mini-button"
                  onClick={() => onAction("patient-detail")}
                >
                  View progress
                </button>
              </div>
            </div>
          ))}
        </article>
      </>
    );
  }

  if (section === "Progress") {
    return (
      <>
        <Heading
          eyebrow="LOOK HOW FAR YOU’VE COME"
          title="Your progress"
          subtitle="A gentle snapshot of your practice. Your journey is more than one number."
        />
        <div className="dashboard-grid">
          <div className="stack">
            <article className="confidence-card glass-panel">
              <div className="card-heading">
                <span>Current confidence check-in</span>
                <span className="level-badge">BEGINNER</span>
              </div>
              <div className="score-row">
                <div className="score-ring" style={{ "--score": 62 }}>
                  <span>
                    62<small>of 100</small>
                  </span>
                </div>
                <div className="score-copy">
                  <strong>Growing at your own pace</strong>
                  <p>
                    Your check-in is one small part of your progress. Notice
                    what feels easier, too.
                  </p>
                </div>
              </div>
              <div className="confidence-foot">
                ↗ &nbsp; 8 points higher than last month
              </div>
            </article>
            <article className="section-card chart-card">
              <SectionHeader title="Your practice rhythm" />
              <Chart />
              <div className="chart-labels">
                <span>JUL</span>
                <span>AUG</span>
                <span>SEP</span>
                <span>OCT</span>
                <span>NOV</span>
              </div>
            </article>
          </div>
          <div className="stack">
            <article className="section-card">
              <SectionHeader title="Small wins this month" />
              <div className="progress-list">
                <div className="progress-row">
                  <strong>Practice days</strong>
                  <span>12 days</span>
                </div>
                <div className="progress-row">
                  <strong>Reading aloud</strong>
                  <span>9 passages</span>
                </div>
                <div className="progress-row">
                  <strong>Sessions attended</strong>
                  <span>4 sessions</span>
                </div>
              </div>
            </article>
            <article className="section-card tip-card">
              <span className="tip-symbol">✳</span>
              <h3>Your score is a guide, not a label.</h3>
              <p>
                Fluency varies from day to day and situation to situation. Keep
                focusing on the goals you and your SLP set together.
              </p>
            </article>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Heading
        eyebrow="A LITTLE SUPPORT"
        title="Resources"
        subtitle="Ideas and tools to make practice feel more comfortable."
      />
      <div className="stat-grid">
        {[
          [
            "◖))",
            "Breathing gently",
            "A short grounding exercise before a conversation.",
          ],
          [
            "▤",
            "Practice passages",
            "Short readings in languages you’re comfortable with.",
          ],
          [
            "♧",
            "Working with your SLP",
            "A few ways to share what matters to you.",
          ],
        ].map(([icon, title, description]) => (
          <article className="section-card" key={title}>
            <span className="tip-symbol">{icon}</span>
            <h3 className="resource-title">{title}</h3>
            <p className="muted-copy">{description}</p>
            <button
              className="outline-button"
              onClick={() =>
                title === "Practice passages"
                  ? onNavigate("Practice")
                  : onAction("resource")
              }
            >
              {title === "Practice passages"
                ? "Choose a passage"
                : "Explore resource"}
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
