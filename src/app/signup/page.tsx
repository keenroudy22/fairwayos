"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created! Check your email.");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white">
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">
          Create Account
        </h1>

        <div className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
          />

          <button
            onClick={signUp}
            className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-xl font-semibold"
          >
            Create Account
          </button>
        </div>
      </div>
    </main>
  );
}