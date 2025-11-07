"use client"

import { Heading1 } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../formElements"
import UseDesigner from "../hooks/useDesigner"
import { useForm, Controller } from "react-hook-form"
import { useEffect, useState } from "react"

const type: ElementsType = "TitleField"

const extraAttributes = {
    title: "Title field",
}

export const TitleFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({ id, type, extraAttributes, }),
    designerBtnElement: { icon: Heading1, label: "title field" },
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

    const { title } = element.extraAttributes

    return <p className="text-xl ">{title}</p>
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { title } = element.extraAttributes

    return (
        <div className="h-[120px] flex flex-col justify-center gap-2 w-full text-sm bg-gray-800/70 p-4 border border-gray-600/60">
            {/* <label className="text-gray-100 text-[1.45rem] tracking-wide"> */}
            <label className="text-muted-foreground">
                Title Field
            </label>
            <p className="text-2xl">{title}</p>
        </div>
    )
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const { updateElement } = UseDesigner()
    const element = elementInstance as CustomInstance
    const { title } = element.extraAttributes

    type FieldValues = {
        title: string;
    };

    // Initialize the form with existing values
    const form = useForm<FieldValues>({
        defaultValues: {
            title
        },
    });

    function applyChanges(values: FieldValues) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                ...element.extraAttributes, // keep other fields intact
                title: values.title,        // only update title
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
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Title
                </label>
                <Controller
                    name="title"
                    control={form.control}
                    rules={{ required: "Enter a title" }}
                    render={({ field }) => (
                        <input
                            {...field}
                            id="title"
                            className={`w-full bg-gray-800 border rounded-lg p-2 focus:outline-none focus:ring-2 ${form.formState.errors.title
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-700 focus:ring-blue-500"
                                }`}
                        />
                    )}
                />
                {form.formState.errors.title && (
                    <p className="text-xs text-red-500 mt-1">
                        {form.formState.errors.title.message}
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


