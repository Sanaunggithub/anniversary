export type ListCategory = "food" | "movies" | "places" | "todo";

export interface ListItem {
  id: string;
  category: ListCategory;
  name: string;
  note?: string;
  completed: boolean;
  image?: string;
  location?: string;
  dateAdded: string;
}

export const listItems: ListItem[] = [
  {
    id: "food-1",
    category: "food",
    name: "Try the little ramen shop",
    note: "Order something neither of us has tried before.",
    location: "Downtown",
    completed: false,
    dateAdded: "2024-01-01",
  },
  {
    id: "food-2",
    category: "food",
    name: "Have a picnic breakfast",
    note: "Coffee, pastries, and no plans afterward.",
    completed: false,
    dateAdded: "2024-01-01",
  },
  {
    id: "food-3",
    category: "food",
    name: "Make homemade pizza",
    note: "Create our own signature toppings.",
    completed: false,
    dateAdded: "2024-01-01",
  },
  {
    id: "movies-1",
    category: "movies",
    name: "Watch a classic movie",
    note: "Take turns choosing the film.",
    completed: false,
    dateAdded: "2024-01-01",
  },
  {
    id: "movies-2",
    category: "movies",
    name: "Have a movie marathon",
    note: "Comfy clothes and all the snacks.",
    completed: false,
    dateAdded: "2024-01-01",
  },
  {
    id: "movies-3",
    category: "movies",
    name: "See a movie at the theater",
    note: "Pick something completely spontaneous.",
    completed: false,
    dateAdded: "2024-01-01",
  },
  {
    id: "places-1",
    category: "places",
    name: "Take a weekend road trip",
    note: "Choose the destination on the way.",
    completed: false,
    dateAdded: "2024-01-01",
  },
  {
    id: "places-2",
    category: "places",
    name: "Visit a new museum",
    note: "Find one with a small café nearby.",
    location: "Somewhere new",
    completed: false,
    dateAdded: "2024-01-01",
  },
  {
    id: "places-3",
    category: "places",
    name: "Watch the sunset somewhere beautiful",
    note: "Bring a blanket and stay until dark.",
    completed: false,
    dateAdded: "2024-01-01",
  },
  {
    id: "todo-1",
    category: "todo",
    name: "Learn something new together",
    note: "Try a class, workshop, or tutorial.",
    completed: false,
    dateAdded: "2024-01-01",
  },
  {
    id: "todo-2",
    category: "todo",
    name: "Take silly photo booth pictures",
    note: "The sillier, the better.",
    completed: false,
    dateAdded: "2024-01-01",
  },
  {
    id: "todo-3",
    category: "todo",
    name: "Build a blanket fort",
    note: "No practical reason required.",
    completed: false,
    dateAdded: "2024-01-01",
  },
];

export const categoryMeta: Record<
  ListCategory,
  { label: string; emoji: string }
> = {
  food: { label: "Restaurants & Food", emoji: "🍜" },
  movies: { label: "Movies", emoji: "🎬" },
  places: { label: "Places", emoji: "✈️" },
  todo: { label: "Things To Do", emoji: "🎯" },
};