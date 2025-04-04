import { STATIC_DATA } from "@/constants/constants";
import { TransactionsDTO } from "@/interface/Transaction";
import { database } from "@/lib/appwrite";
import { cn } from "@/lib/utils";
import { Query } from "appwrite";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  ShoppingBag,
  ShoppingCart,
  Wallet,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Skeleton } from "./ui/skeleton";

//TransactionCard Props and PropsTypes
interface TransactionCardProps {
  className?: string;
}

export default function TransactionsCard({ className }: TransactionCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionsDTO[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);

  // Fetch all the Transactions when page loads.
  useEffect(() => {
    const fetchAllTransactionsPaginated = async () => {
      setIsLoading(true);
      const response = await fetchAllTransactions(10, 0);
      if (response != null) {
        if (response?.documents) {
          const formattedTransactions: TransactionsDTO[] =
            response.documents.map((trx) => ({
              id: trx.$id,
              title: trx.spending_title || "",
              amount: trx.amount || "0.00",
              type: trx.type.trim() === "incoming" ? "incoming" : "outgoing",
              category: trx.spending_category || "",
              icon: trx.spending_category || "",
              timestamp: trx.transaction_date,
            }));
          setTransactions(formattedTransactions);
          setTotalTransactions(formattedTransactions.length);
          setIsLoading(false);
          return response;
        }
      } else {
        setIsLoading(false);
        toast("Failed to fetch the transactions", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setTransactions([]);
      }
    };
    fetchAllTransactionsPaginated();
  }, []);

  const fetchAllTransactions = async (limit: number, offset: number) => {
    const response = await database.listDocuments(
      STATIC_DATA.databaseId,
      STATIC_DATA.dboTransactionsCollectionId,
      [Query.limit(limit), Query.offset(offset)]
    );
    return response;
  };
  const getIcon = (category?: string) => {
    switch (category) {
      case "fundamental":
        return (
          <ShoppingCart className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
        );
      case "salary":
        return (
          <Wallet className="w-4 h-4 text-green-600 dark:text-green-400" />
        );
      case "fun":
        return (
          <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        );
      default:
        return (
          <ShoppingBag className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        );
    }
  };

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
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Recent Activity
            <span className="text-xs font-normal text-zinc-600 dark:text-zinc-400 ml-1">
              ({totalTransactions} transactions)
            </span>
          </h2>
          <span className="text-xs text-zinc-600 dark:text-zinc-400">
            This Month
          </span>
        </div>
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="group flex items-center gap-3">
                <div>
                  <Skeleton className="w-8 h-8 rounded-lg" />
                </div>
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                      <Skeleton className="w-40 h-4 mb-1 rounded" />
                    </h3>
                    <div className="text-zinc-600 dark:text-zinc-400">
                      <Skeleton className="w-40 h-4 mb-1 rounded" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 pl-3">
                    <Skeleton className="w-40 h-4 mb-1 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={cn(
                  "group flex items-center gap-3",
                  "p-2 rounded-lg",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                  "transition-all duration-200"
                )}
              >
                <div
                  key={transaction.id}
                  className={cn(
                    "p-2 rounded-lg",
                    "bg-zinc-100 dark:bg-zinc-800",
                    "border border-zinc-200 dark:border-zinc-700"
                  )}
                >
                  {getIcon(transaction.category)}
                </div>

                <div className="flex-1 flex items-center justify-between min-w-0">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                      {transaction.title}
                    </h3>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                      {transaction.timestamp.split("T")[0]}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 pl-3">
                    <span
                      className={cn(
                        "text-xs font-medium",
                        transaction.type.trim() === "incoming"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      )}
                    >
                      {transaction.type.trim() === "incoming" ? "+" : "-"}
                      {transaction.amount}
                    </span>
                    {transaction.type.trim() === "incoming" ? (
                      <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
        <button
          type="button"
          className={cn(
            "w-full flex items-center justify-center gap-2",
            "py-2 px-3 rounded-lg",
            "text-xs font-medium",
            "bg-gradient-to-r from-zinc-900 to-zinc-800",
            "dark:from-zinc-50 dark:to-zinc-200",
            "text-zinc-50 dark:text-zinc-900",
            "hover:from-zinc-800 hover:to-zinc-700",
            "dark:hover:from-zinc-200 dark:hover:to-zinc-300",
            "shadow-sm hover:shadow",
            "transform transition-all duration-200",
            "hover:-translate-y-0.5",
            "active:translate-y-0",
            "focus:outline-none focus:ring-2",
            "focus:ring-zinc-500 dark:focus:ring-zinc-400",
            "focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
          )}
        >
          <span>View All Transactions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
