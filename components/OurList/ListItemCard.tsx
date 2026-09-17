"use client";

import { motion } from "framer-motion";
import { categoryMeta, type ListItem } from "@/data/list";

interface ListItemCardProps {
  item: ListItem;
  onToggleComplete: (id: string) => void;
}

export default function ListItemCard({
  item,
  onToggleComplete,
}: ListItemCardProps) {
  const category = categoryMeta[item.category];

  return (
    <motion.article
      layout
      animate={{ opacity: item.completed ? 0.55 : 1 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-3 rounded-xl border border-ink/10 bg-background p-4"
    >
      <motion.button
        type="button"
        onClick={() => onToggleComplete(item.id)}
        whileTap={{ scale: 0.9 }}
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-accent"
        aria-label={
          item.completed ? `Mark ${item.name} incomplete` : `Complete ${item.name}`
        }
      >
        <motion.span
          initial={false}
          animate={{
            scale: item.completed ? 1 : 0,
            opacity: item.completed ? 1 : 0,
          }}
          className="h-3 w-3 rounded-full bg-accent"
        />
      </motion.button>

      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <span aria-hidden="true">{category.emoji}</span>
          <motion.h2
            animate={{
              textDecoration: item.completed ? "line-through" : "none",
            }}
            transition={{ duration: 0.25 }}
            className="font-sans-ui font-medium text-ink"
          >
            {item.name}
          </motion.h2>
        </div>

        {item.note && (
          <p className="mt-1 text-sm text-muted">{item.note}</p>
        )}

        {item.location && (
          <span className="mt-3 inline-block rounded-full bg-accent-soft px-2.5 py-1 text-xs text-ink/70">
            {item.location}
          </span>
        )}
      </div>
    </motion.article>
  );
}