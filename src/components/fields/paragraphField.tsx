"use client"

import { PilcrowRight } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../formElements"
import UseDesigner from "../hooks/useDesigner"
import { useForm, Controller } from "react-hook-form"

const type: ElementsType = "ParagraphField"

const extraAttributes = {
    text: "text here",
}

export const ParagraphFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({ id, type, extraAttributes, }),
    designerBtnElement: { icon: PilcrowRight, label: "paragraph field" },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}


function FormComponent({ elementInstance }: { elementInstance: FormElementInstance; }) {

    const element = elementInstance as CustomInstance

    const { text } = element.extraAttributes

    return <p>{text}</p>
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { text } = element.extraAttributes

    return (
        <div className="h-[120px] flex flex-col justify-center gap-2 w-full text-sm bg-gray-800/70 p-4 border border-gray-600/60">
            <label className="text-muted-foreground">
                Paragraph Field
            </label>
            <p>{text}</p>
        </div>
    )
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const { updateElement } = UseDesigner()
    const element = elementInstance as CustomInstance
    const { text } = element.extraAttributes

    type FieldValues = {
        text: string;
    };

    // Initialize the form with existing values
    const form = useForm<FieldValues>({
        defaultValues: {
            text
        },
    });

    function applyChanges(values: FieldValues) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                ...element.extraAttributes, // keep other fields intact
                text: values.text,        // only update title
            },
        });
    }


    return (
        <form
            onSubmit={form.handleSubmit(applyChanges)}
            className="space-y-6 bg-gray-900 text-gray-200 p-6 rounded-xl"
        >
            {/* Title Field */}
            <div>
                <label htmlFor="text" className="block text-sm font-medium mb-1">
                    Text
                </label>
                <Controller
                    name="text"
                    control={form.control}
                    rules={{ required: "Enter text" }}
                    render={({ field }) => (
                        <textarea
                            rows={5}
                            {...field}
                            id="title"
                            className={`w-full bg-gray-800 border rounded-lg p-2 focus:outline-none focus:ring-2 ${form.formState.errors.text
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-700 focus:ring-blue-500"
                                }`}
                        />
                    )}
                />
                {form.formState.errors.text && (
                    <p className="text-xs text-red-500 mt-1">
                        {form.formState.errors.text.message}
                    </p>
                )}
            </div>

            {/* Apply Changes Button */}
            <button
                type="submit"
                className="cursor-pointer w-[100px] mt-4 mx-auto py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition"
            >
                Apply
            </button>
        </form>

    )
}


