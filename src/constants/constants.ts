import { AlertCircle, CheckCircle2, Timer } from "lucide-react";

export const STATIC_DATA = {
  databaseId: "67d9628f003d35be781e",
  dboUserCollectionId: "67d962a2003831439264",
  dboTransactionsCollectionId: "67e287c00017e2026d19",
  dboAccountsCollectionId: "67e288050024991300ae",
  projectId: "67d95e0f003c7b8e3e36",
  endPointURL: "https://cloud.appwrite.io/v1",
} as const;

export const statusConfig = {
  pending: {
    icon: Timer,
    class: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  "in-progress": {
    icon: AlertCircle,
    class: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  completed: {
    icon: CheckCircle2,
    class: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
};

export const iconStyles = {
  savings: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  investment: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  debt: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
};
