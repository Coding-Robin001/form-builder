import React from "react";
import { Rocket } from "lucide-react";

function PublishFormBtn() {
  return (
    <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold bg-emerald-400 hover:bg-emerald-300 text-black rounded-lg transition cursor-pointer">
      <Rocket className="w-4 h-4" />
      <span>Publish</span>
    </button>
  );
}

export default PublishFormBtn;
