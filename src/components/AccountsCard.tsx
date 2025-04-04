"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CreditCard, QrCode, Wallet } from "lucide-react";
import { AccountsDTO } from "@/interface/Accounts";
import { STATIC_DATA } from "@/constants/constants";
import { Query } from "appwrite";
import { database } from "@/lib/appwrite";
import toast, { Toaster } from "react-hot-toast";
import { Skeleton } from "./ui/skeleton";

//AccountCard Props and PropsTypes
interface AccountsCardProps {
  className?: string;
}

export default function AccountsCard({ className }: AccountsCardProps) {
  const [loading, setIsLoading] = useState(false);
  const [accountsData, setAccountsData] = useState<AccountsDTO[]>([]);
  const [totalBalance, setTotalBalance] = useState(0.0);
  // Fetch all the Accounts when page loads.
  useEffect(() => {
    const fetchAllAccountsPaginated = async () => {
      setIsLoading(true);
      const response = await fetchAllAccounts(10, 0);
      if (response != null) {
        if (response?.documents) {
          const formattedAccounts: AccountsDTO[] = response.documents.map(
            (doc) => ({
              id: doc.$id,
              title: doc.account_type || "",
              name: doc.bank_name || "",
              account_type_description: doc.account_type_desc || "",
              description: doc.bank_description || "",
              balance: doc.balance || "0.00",
              type: doc.account_type || "",
            })
          );
          setAccountsData(formattedAccounts);
          const total = formattedAccounts.reduce(
            (sum, account) => parseFloat(sum + account.balance),
            0
          );
          setTotalBalance(total);
          setIsLoading(false);
          return response;
        }
      } else {
        setIsLoading(false);
        toast("Failed to fetch all the Accounts.", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setAccountsData([]);
      }
    };

    fetchAllAccountsPaginated();
  }, []);

  const fetchAllAccounts = async (limit: number, offset: number) => {
    const response = await database.listDocuments(
      STATIC_DATA.databaseId,
      STATIC_DATA.dboAccountsCollectionId,
      [Query.limit(limit), Query.offset(offset)]
    );
    return response;
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
      <Toaster position="top-center" reverseOrder={false} />
      {/* Total Balance Section */}
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Total Balance
        </p>
        {loading ? (
          <h1 className="text-2xl">
            <Skeleton className="w-40 h-8 rounded-lg" />
          </h1>
        ) : (
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            {`$${totalBalance.toFixed(2)}`}
          </h1>
        )}
      </div>

      {/* Accounts List */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
            Your Accounts
          </h2>
        </div>
        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50"
              >
                <div className="flex items-center gap-2">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <div>
                    <Skeleton className="w-40 h-4 mb-1 rounded" />
                    <Skeleton className="w-28 h-3 rounded" />
                  </div>
                </div>
                <Skeleton className="w-16 h-4 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {accountsData.map((account) => (
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
                      {account.account_type_description} ({account.name.trim()})
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
                    {`$${account.balance}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
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
