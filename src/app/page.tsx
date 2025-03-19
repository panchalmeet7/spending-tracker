"use client";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get(); // If session exists, user is logged in
        router.push("/dashboard");
      } catch (error: any) {
        console.log("No active session:", error.message);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (isLoading) return <p>Loading...</p>;

  return null;
}
