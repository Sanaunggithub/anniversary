"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  categoryMeta,
  listItems,
  type ListCategory,
  type ListItem,
} from "@/data/list";
import ListItemCard from "./ListItemCard";

type Filter = "all" | ListCategory;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "food", label: "🍜 Food" },
  { value: "movies", label: "🎬 Movies" },
  { value: "places", label: "✈️ Places" },
  { value: "todo", label: "🎯 To Do" },
];

export default function OurList() {
  const [selectedFilter, setSelectedFilter] = useState<Filter>("all");
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [pickedItem, setPickedItem] = useState<ListItem | null>(null);

  useEffect(() => {
    if (!pickedItem) return;

    const timer = window.setTimeout(() => {
      setPickedItem(null);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [pickedItem]);

  const items = useMemo(() => {
    return listItems
      .map((item) => ({
        ...item,
        completed: completedIds.includes(item.id),
      }))
      .filter(
        (item) =>
          selectedFilter === "all" || item.category === selectedFilter,
      )
      .sort((a, b) => Number(a.completed) - Number(b.completed));
  }, [completedIds, selectedFilter]);

  function toggleComplete(id: string) {
    setCompletedIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    );
  }

  function pickNextDate() {
    const availableItems = listItems.filter(
      (item) => !completedIds.includes(item.id),
    );

    if (availableItems.length === 0) {
      setPickedItem(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableItems.length);
    setPickedItem(availableItems[randomIndex]);
  }

  return (
    <section className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="font-serif-display text-4xl text-ink sm:text-5xl">
          Our List
        </h1>
        <p className="mt-3 text-muted">
          Things we still get to do together
        </p>
      </div>

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setSelectedFilter(filter.value)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              selectedFilter === filter.value
                ? "bg-accent text-white"
                : "bg-accent-soft text-ink hover:bg-accent/20"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mb-6 flex justify-center">
        <button
          type="button"
          onClick={pickNextDate}
          className="rounded-full bg-accent px-5 py-3 font-sans-ui text-sm font-medium text-white transition hover:bg-accent/90"
        >
          🎲 Pick our next date
        </button>
      </div>

      <AnimatePresence>
        {pickedItem && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-5 rounded-xl border border-accent/20 bg-accent-soft p-4 text-center"
          >
            <p className="text-xs uppercase tracking-wide text-muted">
              Your next date
            </p>
            <p className="mt-1 font-sans-ui font-medium text-ink">
              {categoryMeta[pickedItem.category].emoji} {pickedItem.name}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {items.length > 0 ? (
        <motion.div layout className="space-y-3">
          {items.map((item) => (
            <ListItemCard
              key={item.id}
              item={item}
              onToggleComplete={toggleComplete}
            />
          ))}
        </motion.div>
      ) : (
        <p className="py-8 text-center text-muted">Nothing here yet.</p>
      )}
    </section>
  );
}