export interface Letter {
  id: string;
  emoji: string;
  title: string;
  body: string;
  photo?: string;
}

export const letters: Letter[] = [
  {
    id: "1",
    emoji: "💌",
    title: "Open when you miss me",
    body: "PLACEHOLDER_LETTER_TEXT",
  },
  {
    id: "2",
    emoji: "🌧️",
    title: "Open when you're having a bad day",
    body: "PLACEHOLDER_LETTER_TEXT",
  },
  {
    id: "3",
    emoji: "🥺",
    title: "Open when you need a hug",
    body: "PLACEHOLDER_LETTER_TEXT",
  },
  {
    id: "4",
    emoji: "😴",
    title: "Open when you can't sleep",
    body: "PLACEHOLDER_LETTER_TEXT",
  },
  {
    id: "5",
    emoji: "💪",
    title: "Open when you need motivation",
    body: "PLACEHOLDER_LETTER_TEXT",
  },
  {
    id: "6",
    emoji: "🎉",
    title: "Open when something good happens",
    body: "PLACEHOLDER_LETTER_TEXT",
  },
  {
    id: "7",
    emoji: "❤️",
    title: "Open on our anniversary",
    body: "PLACEHOLDER_LETTER_TEXT",
  },
];