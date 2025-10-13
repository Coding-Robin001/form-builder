import React from "react";
import { Save } from "lucide-react";

function SaveFormBtn() {
  return (
    <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-black rounded-lg shadow-lg shadow-emerald-500/30 transition cursor-pointer">
      <Save className="w-4 h-4" />
      <span>Save</span>
    </button>
  );
}

export default SaveFormBtn;
