"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AdminLogin = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);

    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      "content-type": "application/json",
    });

    if (!res.ok) {
      throw new Error("failed to create ticket");
    }

    const data = await res.json();

    // Check if the response contains an error message
    if (res.status !== 201) {
      setErrorMessage(data.message);
      setLoading(false);
      return;
    }

    // setUser(data);
    router.push("/meranameadminha");

    setUsername("");
    setPassword("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <form className="p-6 bg-white rounded shadow-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-5 text-gray-900">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="mt-1 px-4 py-2 w-full border-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="mt-1 px-4 py-2 w-full border-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
        >
          Login
        </button>
      </form>

      <p className=" text-red-500 text-center p-3 leading-none">
        {errorMessage}
      </p>
    </div>
  );
};

export default AdminLogin;
