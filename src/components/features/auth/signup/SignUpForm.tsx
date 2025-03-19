"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { createUser, database } from "@/lib/appwrite";
import toast, { Toaster } from "react-hot-toast";
import { STATIC_DATA } from "@/constants/constants";
import { Loader2 } from "lucide-react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await createUser({ email, password });

      await database.createDocument(
        STATIC_DATA.databaseId, //databaseId
        STATIC_DATA.dboUserCollectionId, //collectionId (dbo.users)
        user.$id, // Unique document ID (primary key)
        {
          email,
          password,
        }
      );
      toast.success("Welcome to the App! 👋");
      setTimeout(() => router.push("/login"), 1500);
    } catch (error: any) {
      toast(error.message, {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="bg-white/5 rounded-xl shadow-lg backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your email below to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <motion.button
                whileHover={!isLoading ? { scale: 1.05 } : {}}
                whileTap={!isLoading ? { scale: 0.9 } : {}}
                disabled={isLoading}
                className={`w-full px-4 py-2 rounded-md font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 
                  ${
                    isLoading
                      ? "bg-gray-200 cursor-not-allowed text-black"
                      : "bg-white text-black"
                  }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" /> Signing Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-white underline hover:text-gray-300 transition cursor-pointer"
              >
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
