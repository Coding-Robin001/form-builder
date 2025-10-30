"use client";

import React from "react";
import { Eye } from "lucide-react";

export default function PreviewFormBtn({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-emerald-400 transition cursor-pointer"
    >
      <Eye className="w-4 h-4" />
      <span>Preview</span>
    </button>
  );
}
