"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    localStorage.setItem(
      "route53-auth",
      JSON.stringify({
        loggedIn: true,
        email,
      })
    );

    router.push("/hosted-zones");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold">AWS Route53 Clone</h1>

        <p className="mb-6 text-gray-500">Sign in to continue</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-orange-500 py-2 font-medium text-white hover:bg-orange-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
