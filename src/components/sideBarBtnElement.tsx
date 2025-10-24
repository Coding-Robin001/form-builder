import React from "react";
import { FormElement } from "./formElements";
import { useDraggable } from "@dnd-kit/core";

export function SideBarBtnElement({ formElement }: { formElement: FormElement }) {
    const { label, icon: Icon } = formElement.designerBtnElement;

    const draggable = useDraggable({
        id: `designer-btn-${formElement.type}`,
        data: {
            type: formElement.type,
            isDesignerBtnElement: true,
        }
    })

    return (
        <button
            onClick={() => console.log(`Selected: ${label}`)}
            ref={draggable.setNodeRef}
            {...draggable.listeners}
            {...draggable.attributes}
            className="
        flex flex-col items-center justify-center 
        bg-gray-900/60 hover:bg-gray-800 
        text-sm font-medium text-gray-300 
        rounded-lg py-3 cursor-pointer 
        border border-gray-800 hover:border-emerald-500/40 
        transition w-full
      "
        >
            {/* Icon */}
            <Icon className="w-5 h-5 text-emerald-400 mb-1" />

            {/* Label */}
            <span>{label}</span>
        </button>
    );
}




export function SideBarBtnElementDragOverlay({ formElement }: { formElement: FormElement }) {
    const { label, icon: Icon } = formElement.designerBtnElement;

    const draggable = useDraggable({
        id: `designer-btn-${formElement.type}`,
        data: {
            type: formElement.type,
            isDesignerBtnElement: true,
        }
    })

    return (
        <button
            onClick={() => console.log(`Selected: ${label}`)}
            className="
        flex flex-col items-center justify-center 
        bg-gray-900/60 hover:bg-gray-800 
        text-sm font-medium text-gray-300 
        rounded-lg py-3 cursor-pointer 
        border border-gray-800 hover:border-emerald-500/40 
        transition w-full
      "
        >
            {/* Icon */}
            <Icon className="w-5 h-5 text-emerald-400 mb-1" />

            {/* Label */}
            <span>{label}</span>
        </button>
    );
}

