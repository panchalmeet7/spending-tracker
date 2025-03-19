"use client";
import Dashboard from "@/components/Dashboard";
import Loading from "@/components/Loading";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
      } catch {
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (isLoading) return <Loading />;

  return <Dashboard />;
}
