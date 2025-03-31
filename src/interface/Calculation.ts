import { LucideIcon } from "lucide-react";

export interface CalculationsDTO {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconStyle: string;
  date: string;
  time?: string;
  amount?: string;
  status: "pending" | "in-progress" | "completed";
  progress: number;
}
