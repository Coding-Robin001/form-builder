"use client";


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
import UseDesigner from "./hooks/useDesigner";
import FormElementsSidebar from "./formElementsSidebar";
import PropertiesFormSidebar from "./propertiesFormSidebar";

interface DesignerProps {
  onElementSelect?: (element: string) => void;
}

const DesignerSideBar: React.FC<DesignerProps> = ({ onElementSelect }) => {

  const { selectedElement } = UseDesigner()

  return (
    <aside className="w-85 border border-red-800 p-4 bg-gray-950/70 overflow-y-auto">
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>

  );
};

export default DesignerSideBar;
