"use client"

import { ListChecks } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance } from "../formElements"

const type: ElementsType = "TextField"

const extraAttributes = {
    label: "Text field",
    helperText: "helper text,",
    required: false,
    placeholder: "enter value here..."
}

export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({ id, type, extraAttributes, }),
    designerBtnElement: { icon: ListChecks, label: "text field" },
    designerComponent: DesignerComponent,
    formComponent: () => <div>form component</div>,
    propertiesComponent: () => <div>properties component</div>,

}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { label, required, placeholder, helperText } = element.extraAttributes

    return (
        <div className="flex flex-col gap-2 w-full text-sm bg-gray-800/70 p-4 ">
            <label className="text-gray-200 text-[1rem] tracking-wide">
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>

            <input
                type="text"
                disabled
                readOnly
                placeholder={placeholder}
                className="w-full bg-[#1C1C1C] text-gray-100 placeholder:text-gray-500 border border-gray-800 rounded-lg px-3 py-2 disabled:opacity-80 disabled:cursor-not-allowed"
            />

            {helperText && (
                <p className="text-xs text-gray-500 mt-1"> {helperText} </p>
            )}
        </div>
    )
}
