"use client";

import React, { useState } from "react";

interface ShareLinkBoxProps {
  shareUrl: string;
}

export default function ShareLinkBox({ shareUrl }: ShareLinkBoxProps) {
  const [copied, setCopied] = useState(false)

  const sharelink = `${window.location.origin}/submit/${shareUrl}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sharelink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };


  return (
    <div className="max-w-7xl mx-auto bg-gray-900/60 border border-gray-800 rounded-xl p-4 flex items-center justify-between text-sm">
      <span className="text-gray-400 truncate">{sharelink}</span>
      <button
        onClick={handleCopy}
        className={`w-[80px] cursor-pointer ml-3 px-3 py-2 rounded-md font-semibold transition ${copied
          ? "bg-emerald-700 text-white"
          : "bg-emerald-600 hover:bg-emerald-500 text-black"
          }`}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
