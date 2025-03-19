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
import toast, { Toaster } from "react-hot-toast";
import { loginUser, database } from "@/lib/appwrite";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { Query } from "appwrite";
import { STATIC_DATA } from "@/constants/constants";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    login();
  };

  const login = async () => {
    try {
      setIsLoading(true);
      const response = await fetchUserByEmail();
      if (
        response.documents[0].email === email &&
        response.documents[0].password === password
      ) {
        await loginUser(email, password);
        toast.success("Login Successful! 🥳");
        setTimeout(() => router.push("/dashboard"), 1500);
      }
    } catch {
      toast("Account not found. Please sign up first.", {
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

  const fetchUserByEmail = async () => {
    const response = await database.listDocuments(
      STATIC_DATA.databaseId,
      STATIC_DATA.dboUserCollectionId,
      [Query.equal("email", email), Query.equal("password", password)]
    );
    return response;
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="bg-white/5 rounded-xl shadow-lg backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="abc@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "password" : "text"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeClosed /> : <Eye />}
                  </button>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.75 }}
                className={`w-full px-4 py-2 rounded-md font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 
                  ${
                    isLoading
                      ? "bg-gray-200 cursor-not-allowed text-black"
                      : "bg-white text-black"
                  }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" /> Logging In...
                  </>
                ) : (
                  "Login"
                )}
              </motion.button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?
              <Link
                href="/signup"
                className="text-white underline hover:text-gray-300 transition cursor-pointer"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
