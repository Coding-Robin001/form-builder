"use client"

import { DivideIcon, Heading1, Minus } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../formElements"
import UseDesigner from "../hooks/useDesigner"
import { useForm, Controller } from "react-hook-form"

const type: ElementsType = "SeperatorField"

export const SeperatorFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({ id, type }),
    designerBtnElement: { icon: Minus, label: "seperator field" },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true
}

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance; }) {

    return <hr className="border border-gray-800" />
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {

    return (
        <div className="h-[120px] flex flex-col justify-center gap-2 w-full text-sm bg-gray-800/70 p-4 border border-gray-600/60">
            <label className="text-muted-foreground">
                Seperator Field
            </label>
            <hr className="border border-gray-800" />
        </div>
    )
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {

    return <p>no properties for this element</p>
}


