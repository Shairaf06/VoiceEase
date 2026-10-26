export const patientNavigation = [
  { label: "Dashboard", icon: "dashboard" },
  { label: "Practice", icon: "practice" },
  { label: "Find an SLP", icon: "search" },
  { label: "Sessions", icon: "sessions" },
  { label: "Progress", icon: "progress" },
];

export const slpNavigation = [
  { label: "Dashboard", icon: "dashboard" },
  { label: "My patients", icon: "people" },
  { label: "Requests", icon: "requests", badge: true },
  { label: "Schedule", icon: "sessions" },
  { label: "Resources", icon: "resources" },
];

export const therapists = [
  {
    initials: "PN",
    name: "Dr. Priya Nair",
    credentials: "MSc, CCC-SLP · 8 years of experience",
    specialties: ["Fluency shaping", "Stuttering support"],
    languages: ["English", "Hindi"],
    capacity: "3 / 6 spots",
    rating: "4.9",
    recommended: true,
  },
  {
    initials: "MI",
    name: "Dr. Meera Iyer",
    credentials: "MA, Speech-Language Pathologist · 6 years",
    specialties: ["Confidence building", "Fluency shaping"],
    languages: ["English", "Tamil"],
    capacity: "2 / 5 spots",
    rating: "4.8",
  },
  {
    initials: "DK",
    name: "Daniel Kim, MS, CCC-SLP",
    credentials: "Speech-Language Pathologist · 7 years",
    specialties: ["Adult communication", "Stuttering support"],
    languages: ["English", "Korean"],
    capacity: "2 / 5 spots",
    rating: "4.9",
  },
];

export const initialRequests = [
  {
    initials: "AM",
    name: "Aarav Mehta",
    detail: "University student · Fluency support",
    time: "Today, 10:24 AM",
  },
  {
    initials: "SK",
    name: "Siya Kapoor",
    detail: "6 years · Confidence building",
    time: "Yesterday, 3:18 PM",
  },
  {
    initials: "RV",
    name: "Rohan Verma",
    detail: "Adult · Stuttering support",
    time: "Yesterday, 6:02 PM",
  },
];

export const upcomingSession = {
  day: "21",
  month: "NOV",
  therapist: "Dr. Priya Nair",
  time: "Thursday · 4:00 PM",
};
