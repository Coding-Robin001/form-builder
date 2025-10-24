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
import { FormElements } from "./formElements";
import { SideBarBtnElement } from "./sideBarBtnElement";

interface DesignerProps {
  onElementSelect?: (element: string) => void;
}

const DesignerSideBar: React.FC<DesignerProps> = ({ onElementSelect }) => {

  return (
    <aside className="w-72 border-l border-gray-800 p-5 bg-gray-950/70 overflow-y-auto">
      <div className="grid grid-cols-2 gap-3">
        <SideBarBtnElement formElement={FormElements.TextField} />
        <SideBarBtnElement formElement={FormElements.TextField} />
        {/* add more as needed */}
      </div>
    </aside>

  );
};

export default DesignerSideBar;
