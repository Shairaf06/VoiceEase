import React from "react";
import Icon from "./Icon.jsx";
import { patientNavigation, slpNavigation } from "../data.js";

export default function Sidebar({
  role,
  section,
  requestCount,
  onRoleChange,
  onNavigate,
}) {
  const navigation = role === "patient" ? patientNavigation : slpNavigation;
  const displayName = role === "patient" ? "Arjun Sharma" : "Dr. Priya Nair";

  return (
    <aside className="sidebar glass-panel" aria-label="Main navigation">
      <a
        className="brand"
        href="#dashboard"
        onClick={(event) => {
          event.preventDefault();
          onNavigate("Dashboard");
        }}
        aria-label="VoiceEase home"
      >
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32">
            <path d="M16 2.8 29 10v12L16 29.2 3 22V10L16 2.8Z" />
            <path d="m11.2 16.1 3.3 3.3 6.8-6.7" />
          </svg>
        </span>
        <span>
          <strong>VoiceEase</strong>
          <small>Your voice, your pace</small>
        </span>
      </a>
      <div className="role-switch" aria-label="Choose dashboard">
        {["patient", "slp"].map((value) => (
          <button
            key={value}
            className={`role-option ${role === value ? "is-active" : ""}`}
            aria-pressed={role === value}
            onClick={() => onRoleChange(value)}
          >
            {value === "patient" ? "Patient" : "SLP"}
          </button>
        ))}
      </div>
      <nav className="primary-nav">
        <p className="nav-label">Workspace</p>
        {navigation.map((item) => (
          <button
            key={item.label}
            className={`nav-link ${section === item.label ? "is-active" : ""}`}
            aria-current={section === item.label ? "page" : undefined}
            onClick={() => onNavigate(item.label)}
          >
            <span className="nav-icon">
              <Icon name={item.icon} />
            </span>
            <span>{item.label}</span>
            {item.badge && <span className="nav-badge">{requestCount}</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="care-note">
          <span className="note-icon">✳</span>
          <p>Progress happens one brave word at a time.</p>
        </div>
        <button
          className="profile-button"
          type="button"
          aria-label="Open profile"
        >
          <span className="avatar avatar-sage">
            {role === "patient" ? "A" : "P"}
          </span>
          <span className="profile-copy">
            <strong>{displayName}</strong>
            <small>
              {role === "patient" ? "Patient account" : "Speech therapist"}
            </small>
          </span>
          <span className="profile-more">···</span>
        </button>
      </div>
    </aside>
  );
}
