"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  const router = useRouter();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("Submit clicked");

  const success = login(email, password);

if (success) {
  router.push("/hosted-zones");
  return;
}

setError("Invalid email or password.");
  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        AWS Route53 Clone
      </h1>

      <p className="mb-8 text-sm text-gray-500">Sign in to continue</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-md bg-orange-500 py-2 font-medium text-white transition hover:bg-orange-600"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
