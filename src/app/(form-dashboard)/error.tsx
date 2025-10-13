"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset?: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-6">
      <div className="max-w-md text-center space-y-6">
        {/* Error Icon */}
        <div className="text-red-500 text-6xl animate-pulse">⚠️</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-emerald-300">
          Oops, something went wrong
        </h1>

        {/* Message */}
        <p className="text-gray-400 text-sm leading-relaxed">
          {error?.message + ", Check Internet and Retry!" || "An unexpected error occurred. Please try again later."}
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => (reset ? reset() : window.location.reload())}
            className="px-5 cursor-pointer py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-emerald-500/40"
          >
            Try Again
          </button>

        </div>
      </div>
    </div>
  );
}
