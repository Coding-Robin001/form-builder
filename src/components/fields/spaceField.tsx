"use client"

import { AlignJustify } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance } from "../formElements"
import UseDesigner from "../hooks/useDesigner"
import { useForm, Controller } from "react-hook-form"

const type: ElementsType = "SpaceField"

const extraAttributes = {
    height: 20, //px
}

export const SpaceFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({ id, type, extraAttributes, }),
    designerBtnElement: { icon: AlignJustify, label: "space field" },
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

    const { height } = element.extraAttributes

    return <div style={{ height, width: "100%" }}></div>
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {

    const element = elementInstance as CustomInstance

    const { height } = element.extraAttributes

    return (
        <div className="h-[120px] flex flex-col items-center justify-center gap-2 w-full text-sm bg-gray-800/70 p-4 border border-gray-600/60">
            <label className="text-muted-foreground">
                Space Field: {height}px
            </label>
            <AlignJustify className="h-8 w-8" />
        </div>
    )
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const { updateElement } = UseDesigner()
    const element = elementInstance as CustomInstance
    const { height } = element.extraAttributes

    type FieldValues = {
        height: number;
    };

    // Initialize the form with existing values
    const form = useForm<FieldValues>({
        defaultValues: {
            height
        },
    });

    function applyChanges(values: FieldValues) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                ...element.extraAttributes, // keep other fields intact
                height: values.height,        // only update title
            },
        });
    }


    return (
        <form
            onSubmit={form.handleSubmit(applyChanges)}
            className="space-y-6 bg-gray-900 text-gray-200 p-6 rounded-xl"
        >
            {/* Height Slider */}
            <div>
                <label htmlFor="height" className="block text-sm font-medium mb-6">
                    Height px: {form.watch("height")}
                </label>
                <Controller
                    name="height"
                    control={form.control}
                    rules={{ required: "Enter a height" }}
                    render={({ field }) => (
                        <div className="flex flex-col gap-2">
                            <input
                                type="range"
                                id="height"
                                min={5}
                                max={200}
                                step={1}
                                value={field.value ?? 20}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                className="
                            w-full h-2 
                            bg-gray-800 
                            rounded-lg appearance-none cursor-pointer
                            accent-blue-500
                            [&::-webkit-slider-thumb]:appearance-none 
                            [&::-webkit-slider-thumb]:w-4 
                            [&::-webkit-slider-thumb]:h-4 
                            [&::-webkit-slider-thumb]:rounded-full 
                            [&::-webkit-slider-thumb]:bg-blue-500 
                            [&::-webkit-slider-thumb]:transition 
                            [&::-webkit-slider-thumb]:hover:bg-blue-400
                            [&::-moz-range-thumb]:w-4 
                            [&::-moz-range-thumb]:h-4 
                            [&::-moz-range-thumb]:rounded-full 
                            [&::-moz-range-thumb]:bg-blue-500
                        "
                            />
                        </div>
                    )}
                />
            </div>

            {/* Apply Changes Button */}
            <button
                type="submit"
                className="cursor-pointer w-[100px] mt-2 mx-auto py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition"
            >
                Apply
            </button>
        </form>

    )
}


