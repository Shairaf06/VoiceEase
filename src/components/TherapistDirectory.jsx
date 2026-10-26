import React, { useMemo, useState } from "react";
import { therapists } from "../data.js";

function PageHeading() {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">PERSONALIZED SUPPORT</p>
        <h1>Find the right support</h1>
        <p>
          Explore speech-language pathologists and choose someone who feels
          right for you.
        </p>
      </div>
    </div>
  );
}

function TherapistCard({ therapist, index, onAction }) {
  return (
    <article className="slp-profile-card">
      <div className="slp-photo">{therapist.initials}</div>
      <div className="slp-main">
        <div className="slp-title-line">
          <h3>{therapist.name}</h3>
          <span className="verified" aria-label="Verified">
            ✓
          </span>
          {therapist.recommended && (
            <span className="match-pill">✳ A good match</span>
          )}
        </div>
        <div className="slp-credentials">{therapist.credentials}</div>
        <div className="specialty-tags">
          {therapist.specialties.map((specialty) => (
            <span key={specialty}>{specialty}</span>
          ))}
        </div>
        <div className="slp-facts">
          <span>
            ◎ &nbsp;Languages: <strong>{therapist.languages.join(", ")}</strong>
          </span>
          <span>◷ &nbsp;Available this week</span>
          <span>♧ &nbsp;{therapist.capacity}</span>
        </div>
      </div>
      <div className="slp-rating">
        ★ <strong>{therapist.rating}</strong>
      </div>
      <div className="slp-actions">
        <button
          className="outline-button"
          onClick={() => onAction("view-slp", index)}
        >
          View profile
        </button>
        <button
          className="primary-button"
          onClick={() => onAction("choose-slp", index)}
        >
          Request
        </button>
      </div>
    </article>
  );
}

export default function TherapistDirectory({
  selectedSLP,
  onSelectSLP,
  onAction,
  onSubmitRequest,
  toast,
}) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [specialty, setSpecialty] = useState("all");
  const visibleTherapists = useMemo(
    () =>
      therapists.filter((therapist) => {
        const haystack =
          `${therapist.name} ${therapist.credentials} ${therapist.specialties.join(" ")} ${therapist.languages.join(" ")}`.toLowerCase();
        return (
          haystack.includes(query.toLowerCase()) &&
          (language === "all" || therapist.languages.includes(language)) &&
          (specialty === "all" || therapist.specialties.includes(specialty))
        );
      }),
    [query, language, specialty],
  );

  return (
    <>
      <PageHeading />
      <div className="page-grid">
        <div>
          <div className="filters-row">
            <label className="search-field">
              <span aria-hidden="true">⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name, language, or specialty"
                aria-label="Search therapists"
              />
            </label>
            <select
              className="filter-select"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              aria-label="Filter by language"
            >
              <option value="all">All languages</option>
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Korean</option>
            </select>
            <select
              className="filter-select"
              value={specialty}
              onChange={(event) => setSpecialty(event.target.value)}
              aria-label="Filter by specialty"
            >
              <option value="all">All specialties</option>
              <option>Fluency shaping</option>
              <option>Stuttering support</option>
              <option>Confidence building</option>
            </select>
          </div>
          <div className="slp-cards">
            {visibleTherapists.length ? (
              visibleTherapists.map((therapist, index) => (
                <TherapistCard
                  key={therapist.name}
                  therapist={therapist}
                  index={therapists.indexOf(therapist)}
                  onAction={onAction}
                />
              ))
            ) : (
              <div className="empty-card">
                <div className="empty-icon">⌕</div>
                <h2>No matches yet</h2>
                <p>Try a different name, language, or support area.</p>
              </div>
            )}
          </div>
        </div>
        <aside className="request-panel glass-panel">
          <h2>Request a consultation</h2>
          <p>
            Share what you’re looking for. There’s no pressure to book before
            you’re ready.
          </p>
          <div className="form-field">
            <label htmlFor="consult-slp">Therapist</label>
            <select
              id="consult-slp"
              value={selectedSLP}
              onChange={(event) => onSelectSLP(event.target.value)}
            >
              {therapists.map((therapist) => (
                <option key={therapist.name}>{therapist.name}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="consult-language">Preferred language</label>
            <select id="consult-language">
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Bengali</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="consult-focus">
              What would you like support with?
            </label>
            <select id="consult-focus">
              <option>Speaking with more ease</option>
              <option>Building confidence</option>
              <option>School or work conversations</option>
              <option>Finding my starting point</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="consult-time">Preferred time to meet</label>
            <select id="consult-time">
              <option>Flexible — let’s discuss</option>
              <option>Weekday mornings</option>
              <option>Weekday afternoons</option>
              <option>Evenings</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="consult-message">A note (optional)</label>
            <textarea
              id="consult-message"
              placeholder="Anything you’d like your therapist to know…"
            />
          </div>
          <button
            className="primary-button"
            onClick={() => {
              onSubmitRequest();
              toast(
                `Consultation request sent to ${selectedSLP}. We’ll let you know when they respond.`,
              );
            }}
          >
            Send consultation request <span>→</span>
          </button>
          <div className="request-steps">
            <div className="request-step">
              <span className="step-dot">✓</span>
              <span>Request sent</span>
            </div>
            <div className="request-step">
              <span className="step-dot">2</span>
              <span>They’ll review</span>
            </div>
            <div className="request-step">
              <span className="step-dot">3</span>
              <span>Choose a time</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
