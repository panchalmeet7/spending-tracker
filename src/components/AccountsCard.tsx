import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CreditCard, QrCode, Wallet } from "lucide-react";
import { AccountsDTO } from "@/interface/Accounts";

//AccountCard Props and PropsTypes
interface AccountsCardProps {
  totalBalance?: string;
  accounts?: AccountsDTO[];
  className?: string;
}

//Data
const ACCOUNTS: AccountsDTO[] = [
  {
    id: "1",
    title: "Salary Account (HDFC)",
    description: "Personal savings/investment account",
    balance: "₹8,459.45",
    type: "savings",
  },
  {
    id: "2",
    title: "Checking Account (Axis Bank)",
    description: "Discretionary spending",
    balance: "₹2,850.00",
    type: "checking",
  },
  {
    id: "3",
    title: "Savings Account (BOB)",
    description: "Fundamental expenses (fun)",
    balance: "₹3,000.00",
    type: "savings",
  },
  {
    id: "4",
    title: "Investment Portfolio (M)",
    description: "Stock, ETFs & MFs",
    balance: "₹15,230.80",
    type: "investment",
  },
  {
    id: "5",
    title: "Investment Portfolio (P)",
    description: "Stock & MFs",
    balance: "₹15,230.80",
    type: "investment",
  },
];

export default function AccountsCard({
  totalBalance = "₹26,540.25",
  accounts = ACCOUNTS,
  className,
}: AccountsCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto",
        "bg-white dark:bg-zinc-900/70",
        "border border-zinc-100 dark:border-zinc-800",
        "rounded-xl shadow-sm backdrop-blur-xl",
        className
      )}
    >
      {/* Total Balance Section */}
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Total Balance
        </p>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {totalBalance}
        </h1>
      </div>

      {/* Accounts List */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
            Your Accounts
          </h2>
        </div>

        <div className="space-y-1">
          {accounts.map((account) => (
            <div
              key={account.id}
              className={cn(
                "group flex items-center justify-between",
                "p-2 rounded-lg",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                "transition-all duration-200"
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn("p-1.5 rounded-lg", {
                    "bg-emerald-100 dark:bg-emerald-900/30":
                      account.type === "savings",
                    "bg-blue-100 dark:bg-blue-900/30":
                      account.type === "checking",
                    "bg-purple-100 dark:bg-purple-900/30":
                      account.type === "investment",
                  })}
                >
                  {account.type === "savings" && (
                    <Wallet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  )}
                  {account.type === "checking" && (
                    <QrCode className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  )}
                  {account.type === "investment" && (
                    <ArrowUpRight className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  )}
                  {account.type === "debt" && (
                    <CreditCard className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                    {account.title}
                  </h3>
                  {account.description && (
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                      {account.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  {account.balance}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Updated footer with four buttons */}
      {/* <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200"
            )}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200"
            )}
          >
            <SendHorizontal className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200"
            )}
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            <span>Top-up</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200"
            )}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>More</span>
          </button>
        </div>
      </div> */}
    </div>
  );
}
