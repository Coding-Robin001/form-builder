import React from "react";
import { SideBarBtnElement } from "./sideBarBtnElement";
import { FormElements } from "./formElements";

export default function FormElementsSidebar() {
    return (
        <div>
            <p className="text-[0.9rem] font-semibold">Drag and drop elements</p>
            <hr className="my-4 border-t border-gray-800" />

            <div className="grid grid-cols-2 gap-4 items-start">
                {/* full-width label */}
                <p className="col-span-2 text-sm text-gray-400 text-left my-2">
                    Layout elements
                </p>
                <SideBarBtnElement formElement={FormElements.TitleField} />
                <SideBarBtnElement formElement={FormElements.SubtitleField} />
                <SideBarBtnElement formElement={FormElements.ParagraphField} />
                <SideBarBtnElement formElement={FormElements.SeperatorField} />
                <SideBarBtnElement formElement={FormElements.SpaceField} />

                <p className="col-span-2 text-sm text-gray-400 text-left my-2">
                    Form elements
                </p>
                <SideBarBtnElement formElement={FormElements.TextField} />
                <SideBarBtnElement formElement={FormElements.NumberField} />

            </div>
        </div>
    );
}
