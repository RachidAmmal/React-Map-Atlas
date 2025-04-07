export const QUIZ_LEVELS = [
  {
    id: "relaxed",
    mode: 1,
    title: "Relaxed",
    icon: "☕",
    details: [
      "🌍 Guess 15 Countries.",
      "🌍 You have 5 minutes.",
      "🌍 You have 5 lives."
    ],
    className: "relaxed"
  },
  {
    id: "challenge",
    mode: 2,
    title: "Challenge",
    icon: "🎯",
    details: [
      "🌍 Guess 30 Countries of UN members.",
      "🌍 You have 10 minutes.",
      "🌍 You have 10 lives."
    ],
    className: "challenge"
  },
  {
    id: "hardcore",
    mode: 3,
    title: "HardCore",
    icon: "☠️",
    details: [
      "🌍 Guess 60 Countries and Territories of the world.",
      "🌍 You have 15 minutes.",
      "🌍 You have 15 lives.",
      "🚀 Some territories have the same flag as their country."
    ],
    className: "hardcore"
  },
  {
    id: "bycontinent",
    mode: 4,
    title: "ByContinent",
    icon: "🗺️",
    details: [
      "🌍 Guess all the countries of any continent.",
      "🌍 You have 10 minutes.",
      "🌍 You have 5 lives.",
    ],
    className: "bycontinent"
  }
];
