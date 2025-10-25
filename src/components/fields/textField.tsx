"use client"

import { ListChecks } from "lucide-react"
import { ElementsType, FormElement } from "../formElements"


const type: ElementsType = "TextField"

export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: {
            label: "Text field",
            helperText: "helper text,",
            required: false,
            placeholder: "enter value here..."
        }
    }),
    designerBtnElement: {
        icon: ListChecks,
        label: "text field"
    },
    designerComponent: () => <div className="text-red-500">designer component</div>,
    formComponent: () => <div>form component</div>,
    propertiesComponent: () => <div>properties component</div>,

}