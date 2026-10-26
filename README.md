# VoiceEase 🎙️

## Frontend preview
 
VoiceEase is a React app built with Vite. To run it locally:

```bash
npm install
npm run dev
```

The prototype includes patient and SLP workspaces, therapist discovery and consultation request forms, practice and progress screens, session views, and a persistent light/dark theme switch.

An earlier hosted version is available at [VoiceEase Demo](https://speakease-102583844019.us-west1.run.app/signup).

### Project structure

The main source files are grouped by what they do. Generated and installed folders such as `dist/` and `node_modules/` are omitted from this map.

```text
VoiceEase-main/
├── index.html                    # Browser page; contains the React root element
├── package.json                  # Project scripts and dependency list
├── package-lock.json             # Exact dependency versions for repeatable installs
├── .gitignore                    # Files Git should not track (for example, dist/)
├── README.md                     # Project overview, setup, and code guide
├── styles.css                    # Main design system and responsive/light-dark styles
└── src/
    ├── main.jsx                  # Starts React and loads the app and styles
    ├── App.jsx                   # Shared state, role/page navigation, theme, actions
    ├── data.js                   # Sample therapists, requests, and menu items
    └── components/
        ├── Sidebar.jsx           # Brand, Patient/SLP switch, and desktop navigation
        ├── Icon.jsx              # Shared inline SVG icons
        ├── Dashboards.jsx        # Patient home and SLP overview dashboards
        ├── TherapistDirectory.jsx# Search, filters, profiles, and consultation form
        ├── Practice.jsx          # Reading practice screen and demo timer
        └── OtherPages.jsx        # Sessions, requests, patients, progress, resources
```

#### How the app fits together

1. The browser opens `index.html`, which provides the element with `id="root"`.
2. `src/main.jsx` mounts the React application in that element and imports the stylesheets.
3. `src/App.jsx` owns shared app state: which role is selected, which page is open, the theme, pending sample requests, and dialogs or notifications.
4. `src/App.jsx` renders the matching page component. The sidebar and top bar provide navigation and the light/dark switch.
5. Components get the data and actions they need through React props. Shared example content lives in `src/data.js` rather than being repeated in each screen.

#### Component responsibilities

- `src/App.jsx` — Main coordinator. It handles Patient/SLP switching, navigation, saving the selected theme in browser storage, showing dialogs and messages, and updating the example request list.
- `src/components/Sidebar.jsx` — The role switch and navigation menu. The menu items come from `src/data.js`.
- `src/components/Dashboards.jsx` — The patient dashboard and the SLP dashboard. Dashboard buttons call shared navigation or action handlers supplied by `App.jsx`.
- `src/components/TherapistDirectory.jsx` — Therapist search and filters, profile cards, and the consultation request form. Therapist options come from `src/data.js`.
- `src/components/Practice.jsx` — The reading exercise and an elapsed-time practice demo. It does not record or upload audio.
- `src/components/OtherPages.jsx` — The secondary screens for sessions, requests, patients, progress, and resources.
- `src/components/Icon.jsx` — Reusable SVG icons used by navigation.
- `src/data.js` — Placeholder therapists, consultation requests, and navigation definitions. Replace this with API data when a backend is connected.
- `styles.css` — Color tokens, typography, glass surfaces, light/dark theme styles, and responsive layouts.
- `package.json` — Common commands: `npm run dev` starts local development, `npm run build` creates a production build, and `npm run format` formats the project files.
- `package-lock.json` — Locks dependency versions so teammates install a consistent toolchain.

#### A typical change

For a new screen, add or update a component in `src/components/`, then connect it to navigation and page selection in `src/App.jsx`. Put reusable example data in `src/data.js`, and add styles to `styles.css`. Keep shared state in `App.jsx` when more than one screen needs it; keep screen-only state inside that screen’s component.

The screens use sample data. Authentication, server-side request handling, live scheduling/video calls, speech recording, speech analysis, and AI-generated feedback are not connected yet.

### Voice-First Learning & Speech Practice Platform

**VoiceEase** is an accessibility-focused platform designed to make learning and speaking practice more inclusive through voice interaction and AI-assisted feedback. It aims to support visually impaired learners and individuals who want to build speaking confidence, including people who stammer.

---

## 📌 About the Project

Traditional learning platforms often depend heavily on visual interfaces, reading, and typing. VoiceEase explores a voice-first approach that enables users to interact with educational content through speech and audio feedback.

By combining accessible learning workflows, speech technologies, and AI-assisted evaluation, VoiceEase aims to create a more inclusive and interactive learning experience.

## 🎯 Objectives

- Make digital learning more accessible through voice-based interaction.
- Enable learners to engage with educational content using speech and audio.
- Support AI-assisted evaluation of spoken answers.
- Provide constructive feedback to encourage continuous improvement.
- Help learners and mentors monitor educational progress.
- Promote inclusive and independent learning experiences.

## ✨ Key Features

- **User Authentication:** Signup and login for accessing the platform.
- **Learning Management:** Student, class, lesson, and mentor management.
- **Voice-Based Learning:** Designed to support spoken interaction with educational content.
- **Speech-to-Text (STT):** Converts spoken responses into text for processing.
- **AI-Assisted Evaluation:** Intended to evaluate answers and provide relevant feedback.
- **Text-to-Speech (TTS):** Designed to deliver lessons and feedback through audio.
- **Progress Tracking:** Planned assessment history and learner progress monitoring.
- **Accessibility-Focused Experience:** Aims to reduce dependence on traditional text-based interaction.

_Note: Feature availability depends on the current implementation. Planned features are not necessarily live._

---

## 🔄 Project Workflow

```mermaid
flowchart TD
    A[User Signup / Login] --> B[Dashboard]
    B --> C[Select Class or Lesson]
    C --> D[Listen to Learning Content]
    D --> E[Speak an Answer]
    E --> F[Speech-to-Text]
    F --> G[AI Answer Evaluation]
    G --> H[Generate Feedback]
    H --> I[Text-to-Speech]
    I --> J[Audio Feedback]
    G --> K[Save Assessment Results]
    K --> L[Progress Tracking]
```

### How VoiceEase Works

1. **Authentication:** Users sign up or log in to access the platform.
2. **Learning:** Users access available classes and lessons.
3. **Voice Interaction:** Users listen to content and provide spoken responses.
4. **Speech Recognition:** Spoken responses are converted into text.
5. **AI Evaluation:** The response can be assessed against the question or an evaluation rubric.
6. **Personalized Feedback:** The system can generate constructive suggestions and deliver them through audio.
7. **Progress Monitoring:** Assessment results can be stored to support future progress analysis.

---

## 🏗️ System Architecture

VoiceEase is designed around a frontend, backend, database, and AI-powered voice-processing workflow.

| Component         | Responsibility                                     |
| ----------------- | -------------------------------------------------- |
| Frontend          | User interface, dashboards, and lesson interaction |
| Authentication    | Identity verification and access management        |
| Backend API       | Application logic and service communication        |
| Database          | User, class, lesson, and learning records          |
| Speech-to-Text    | Speech transcription                               |
| AI Evaluation     | Response analysis and feedback generation          |
| Text-to-Speech    | Audio generation from text                         |
| Progress Tracking | Assessment history and learning reports            |

The exact frameworks, database, authentication provider, and AI integrations should be documented after verifying the repository source code.

---

## 🛠️ Technology Stack

| Layer         | Technology                                                                 |
| ------------- | -------------------------------------------------------------------------- |
| Frontend      | React, Vite, JavaScript, CSS                                                |
| Backend       | To be confirmed from source code                                           |
| Database      | To be confirmed from source code                                           |
| Speech AI     | Gnani Voice AI was previously considered for integration                   |
| AI Evaluation | To be confirmed                                                            |
| Deployment    | Frontend demo link listed above; current deployment status to be confirmed |

---

## ♿ Accessibility & Inclusion

Accessibility is a core design goal of VoiceEase.

The project aims to:

- Provide audio-based access to educational content.
- Reduce reliance on reading and typing.
- Support spoken-answer practice.
- Deliver clear and encouraging feedback.
- Improve independent access to digital learning.

**Responsible AI:** Evaluating the meaning of an answer is different from measuring speech fluency. Reliable feedback about pauses, repetitions, or stammering-related speech patterns requires suitable audio analysis and validation.

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

Install dependencies using the package manager specified by the project, configure the required environment variables, and follow the setup instructions for the frontend and backend.

Create a `.env` file using the provided `.env.example`, if available.

**Security:** Never commit API keys, passwords, or production credentials to GitHub.

_Complete installation commands will be added after verifying the actual repository structure._

---

## 🗺️ Roadmap

- [ ] Finalize and document authentication and role-based access.
- [ ] Enhance voice-based lesson interaction.
- [ ] Integrate and validate speech-to-text processing.
- [ ] Develop AI-assisted spoken-answer evaluation.
- [ ] Add text-to-speech feedback.
- [ ] Implement learner progress and mastery reports.
- [ ] Improve screen-reader and keyboard accessibility.
- [ ] Test usability with intended users.

_These are development goals, not claims that every feature is already implemented._

---

## 🤝 Contributing

Contributions and ideas that improve accessibility, voice interaction, and inclusive learning are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Submit a pull request with a clear description.

---

## 📄 License

A license has not yet been specified. Choose an appropriate license before inviting public reuse or contributions.

---

## 🌍 Our Vision

VoiceEase aims to make learning more inclusive by bringing together accessible design, voice interaction, and responsible AI.

We envision a world where learners can access educational content, practise communication, and develop confidence through learning experiences that better suit their needs.

---

**VoiceEase — Your voice. Your learning. Your confidence.** 🎙️
