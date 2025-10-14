"use client";

import React from "react";
import {
  Heading1,
  Heading2,
  Text,
  AlignJustify,
  SeparatorHorizontal,
  ListChecks,
  Calendar,
  Hash,
  LayoutDashboard,
} from "lucide-react";

interface DesignerProps {
  onElementSelect?: (element: string) => void;
}

const DesignerSideBar: React.FC<DesignerProps> = ({ onElementSelect }) => {
  const layoutElements = [
    { label: "Title", icon: Heading1 },
    { label: "Subtitle", icon: Heading2 },
    { label: "Paragraph", icon: Text },
    { label: "Spacer", icon: AlignJustify },
    { label: "Separator", icon: SeparatorHorizontal },
  ];

  const formElements = [
    { label: "Text Field", icon: ListChecks },
    { label: "Text Area", icon: Calendar },
    { label: "Select", icon: ListChecks },
    { label: "Number", icon: Hash },
    { label: "Date Picker", icon: Calendar },
    { label: "Checkbox", icon: LayoutDashboard },
  ];

  const renderElementGrid = (elements: { label: string; icon: any }[]) => (
    <div className="grid grid-cols-2 gap-3">
      {elements.map(({ label, icon: Icon }) => (
        <div
          key={label}
          onClick={() => onElementSelect?.(label)}
          className="flex flex-col items-center justify-center bg-gray-900/60 hover:bg-gray-800 text-sm font-medium text-gray-300 rounded-lg py-3 cursor-pointer border border-gray-800 hover:border-emerald-500/40 transition"
        >
          <Icon className="w-5 h-5 text-emerald-400 mb-1" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <aside className="w-72 border-l border-gray-800 p-5 flex flex-col gap-6 overflow-y-auto bg-gray-950/70">
      <section>
        <h2 className="text-sm uppercase text-gray-400 font-semibold mb-3 tracking-wider">
          Layout elements
        </h2>
        {renderElementGrid(layoutElements)}
      </section>

      <section>
        <h2 className="text-sm uppercase text-gray-400 font-semibold mb-3 tracking-wider">
          Form elements
        </h2>
        {renderElementGrid(formElements)}
      </section>
    </aside>
  );
};

export default DesignerSideBar;
