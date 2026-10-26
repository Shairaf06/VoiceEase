import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Icon from "./components/Icon.jsx";
import { PatientDashboard, SlpDashboard } from "./components/Dashboards.jsx";
import TherapistDirectory from "./components/TherapistDirectory.jsx";
import Practice from "./components/Practice.jsx";
import OtherPages from "./components/OtherPages.jsx";
import {
  initialRequests,
  patientNavigation,
  slpNavigation,
  therapists,
} from "./data.js";

function ThemeToggle({ theme, onChange }) {
  return (
    <div className="theme-toggle" role="group" aria-label="Color theme">
      {[
        ["light", "☼"],
        ["dark", "☾"],
      ].map(([value, icon]) => (
        <button
          key={value}
          className={`theme-option ${theme === value ? "is-active" : ""}`}
          aria-pressed={theme === value}
          onClick={() => onChange(value)}
        >
          <span aria-hidden="true">{icon}</span>
          <span className="theme-word">
            {value === "light" ? "Light" : "Dark"}
          </span>
        </button>
      ))}
    </div>
  );
}

function Modal({ modal, onClose, onNavigate, onToast }) {
  useEffect(() => {
    if (!modal) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [modal, onClose]);
  if (!modal) return null;

  let details = modal.body;
  let buttons = (
    <button className="primary-button" onClick={onClose}>
      Got it
    </button>
  );
  if (modal.type === "therapist") {
    const therapist = therapists[modal.index];
    details = (
      <>
        <p>{therapist.credentials}</p>
        <p>
          <strong>Areas of support</strong>
          <br />
          {therapist.specialties.join(" · ")}
        </p>
        <p>
          <strong>Languages</strong>
          <br />
          {therapist.languages.join(", ")}
        </p>
        <p>
          <strong>Availability</strong>
          <br />
          {therapist.capacity} available · Sessions this week
        </p>
      </>
    );
    buttons = (
      <button
        className="primary-button"
        onClick={() => {
          onClose();
          onNavigate("Find an SLP");
          onToast(
            `${therapist.name} selected. Complete the consultation form when you’re ready.`,
          );
        }}
      >
        Request a consultation →
      </button>
    );
  } else if (modal.type === "request") {
    const request = modal.request;
    details = (
      <>
        <p>{request.detail}</p>
        <p>
          <strong>Message from patient</strong>
          <br />
          “I’d like to practise speaking with more confidence in everyday
          conversations.”
        </p>
        <p>
          <strong>Preferred availability</strong>
          <br />
          Flexible — open to discussing times.
        </p>
      </>
    );
    buttons = (
      <>
        <button
          className="accept-button"
          onClick={() => {
            onClose();
            modal.onAccept();
          }}
        >
          Accept request
        </button>
        <button className="outline-button" onClick={onClose}>
          Close
        </button>
      </>
    );
  } else if (modal.type === "session-request") {
    details = (
      <>
        <p>Choose a time to discuss with your speech-language pathologist.</p>
        <div className="form-field">
          <label htmlFor="session-date">Preferred day</label>
          <input id="session-date" type="date" />
        </div>
        <div className="form-field">
          <label htmlFor="session-time">Preferred time</label>
          <select id="session-time">
            <option>Flexible</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>
      </>
    );
    buttons = (
      <button
        className="primary-button"
        onClick={() => {
          onClose();
          onToast("Session time request sent to your SLP.");
        }}
      >
        Send request →
      </button>
    );
  } else if (modal.type === "capacity") {
    details = (
      <>
        <p>
          Your current capacity is <strong>12 of 15 patients</strong>. You can
          continue accepting new requests while you have space.
        </p>
        <div className="form-field">
          <label htmlFor="capacity-input">Maximum active patients</label>
          <select id="capacity-input">
            <option>15 patients</option>
            <option>12 patients</option>
            <option>10 patients</option>
          </select>
        </div>
      </>
    );
    buttons = (
      <button
        className="primary-button"
        onClick={() => {
          onClose();
          onToast("Availability preferences saved.");
        }}
      >
        Save availability
      </button>
    );
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 id="modal-title">{modal.title}</h2>
        <div className="modal-body">{details}</div>
        <div className="modal-actions">{buttons}</div>
      </section>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState("patient");
  const [section, setSection] = useState("Dashboard");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("voiceease-theme") || "light",
  );
  const [requests, setRequests] = useState(initialRequests);
  const [selectedSLP, setSelectedSLP] = useState(therapists[0].name);
  const [toastMessage, setToastMessage] = useState("");
  const [modal, setModal] = useState(null);
  const [sessionFilter, setSessionFilter] = useState("Upcoming");

  useEffect(() => {
    localStorage.setItem("voiceease-theme", theme);
  }, [theme]);

  const toast = (message) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 3200);
  };
  const navigate = (destination) => {
    setSection(destination);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const acceptRequest = (index) => {
    const patient = requests[index];
    if (!patient) return;
    setRequests((current) =>
      current.filter((_, currentIndex) => currentIndex !== index),
    );
    toast(`${patient.name} accepted. You can now coordinate a first session.`);
  };
  const handleAction = (action, index) => {
    if (action === "accept-request") {
      acceptRequest(index);
      return;
    }
    if (action === "view-request") {
      setModal({
        type: "request",
        title: `Consultation request from ${requests[index]?.name || "patient"}`,
        request: requests[index],
        onAccept: () => acceptRequest(index),
      });
      return;
    }
    if (action === "view-slp") {
      setModal({
        type: "therapist",
        title: therapists[index]?.name || "Speech-language pathologist",
        index,
      });
      return;
    }
    if (action === "choose-slp") {
      setSelectedSLP(therapists[index]?.name || therapists[0].name);
      document
        .querySelector(".request-panel")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast(
        `${therapists[index]?.name} selected. Complete the form when you’re ready.`,
      );
      return;
    }
    if (action === "join-session") {
      setModal({
        title: "Your next session",
        body: (
          <>
            <p>
              <strong>Dr. Priya Nair</strong> · Speech-Language Pathologist
            </p>
            <p>Thursday, November 21 · 4:00–4:30 PM</p>
            <p>
              Your session link will appear here when video sessions are
              connected. For now, you can review your goals together when you
              meet.
            </p>
          </>
        ),
      });
      return;
    }
    if (action === "book-session") {
      setModal({ type: "session-request", title: "Request a session" });
      return;
    }
    if (action === "capacity") {
      setModal({ type: "capacity", title: "Manage patient capacity" });
      return;
    }
    if (action === "patient-detail") {
      setModal({
        title: "Patient progress",
        body: (
          <p>
            Progress views are designed to support conversations with the
            patient and their SLP. Scores should be considered alongside
            personal goals and context.
          </p>
        ),
      });
      return;
    }
    if (action === "resource")
      toast("More supportive resources are coming soon.");
  };

  const pageContent = () => {
    if (section === "Dashboard")
      return role === "patient" ? (
        <PatientDashboard onNavigate={navigate} onAction={handleAction} />
      ) : (
        <SlpDashboard
          requestCount={requests.length}
          onAction={handleAction}
          onNavigate={navigate}
        />
      );
    if (section === "Find an SLP")
      return (
        <TherapistDirectory
          selectedSLP={selectedSLP}
          onSelectSLP={setSelectedSLP}
          onAction={handleAction}
          onSubmitRequest={() => {}}
          toast={toast}
        />
      );
    if (section === "Practice")
      return <Practice onNavigate={navigate} toast={toast} />;
    return (
      <OtherPages
        section={section}
        role={role}
        requests={requests}
        onNavigate={navigate}
        onAction={handleAction}
        sessionFilter={sessionFilter}
        setSessionFilter={setSessionFilter}
      />
    );
  };

  const navigation = role === "patient" ? patientNavigation : slpNavigation;
  const avatar = role === "patient" ? "A" : "P";

  return (
    <div className="app-shell" data-theme={theme} data-role={role}>
      <Sidebar
        role={role}
        section={section}
        requestCount={requests.length}
        onRoleChange={(nextRole) => {
          setRole(nextRole);
          setSection("Dashboard");
        }}
        onNavigate={navigate}
      />
      <main className="main-area">
        <header className="topbar">
          <div className="mobile-brand">
            <span className="brand-mark small-mark">V</span>
            <strong>VoiceEase</strong>
          </div>
          <div className="breadcrumbs">
            <span>Workspace</span>
            <span className="crumb-sep">/</span>
            <strong>{section}</strong>
          </div>
          <div className="topbar-actions">
            <label className="language-control" aria-label="Choose language">
              <span aria-hidden="true">文</span>
              <select
                aria-label="Choose language"
                onChange={(event) =>
                  toast(`Language set to ${event.target.value}.`)
                }
              >
                <option>English</option>
                <option>हिन्दी</option>
                <option>தமிழ்</option>
                <option>বাংলা</option>
              </select>
            </label>
            <button
              className="icon-button notification-button"
              aria-label="Notifications"
              title="Notifications"
              onClick={() => toast("You’re all caught up.")}
            >
              <svg viewBox="0 0 24 24">
                <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
              </svg>
              <i />
            </button>
            <ThemeToggle theme={theme} onChange={setTheme} />
            <button
              className="avatar avatar-button"
              aria-label="Profile menu"
              onClick={() =>
                toast(role === "patient" ? "Patient profile" : "SLP profile")
              }
            >
              {avatar}
            </button>
          </div>
        </header>
        <section className="page-content" tabIndex={-1}>
          {pageContent()}
        </section>
        <footer className="page-footer">
          <span>VoiceEase</span>
          <span>Support that moves at your pace.</span>
          <a
            href="#accessibility"
            onClick={(event) => {
              event.preventDefault();
              toast("Accessibility is central to VoiceEase.");
            }}
          >
            Accessibility
          </a>
        </footer>
      </main>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navigation.map((item) => (
          <button
            key={item.label}
            className={`nav-link ${section === item.label ? "is-active" : ""}`}
            aria-current={section === item.label ? "page" : undefined}
            onClick={() => navigate(item.label)}
          >
            <span className="nav-icon">
              <Icon name={item.icon} />
            </span>
            <span>{item.label.replace(" an SLP", "")}</span>
          </button>
        ))}
      </nav>
      {toastMessage && (
        <div className="toast-region" aria-live="polite" aria-atomic="true">
          <div className="toast">{toastMessage}</div>
        </div>
      )}
      <Modal
        modal={modal}
        onClose={() => setModal(null)}
        onNavigate={navigate}
        onToast={toast}
      />
    </div>
  );
}
