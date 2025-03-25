"use client";
import LoginForm from "@/components/features/auth/login/LoginForm";
import Loading from "@/components/Loading";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
        router.push("/dashboard");
      } catch {
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
