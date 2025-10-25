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
    return <div className="text-red-500">{element.extraAttributes.label}</div>
}