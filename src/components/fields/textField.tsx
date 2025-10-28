"use client"

import { ListChecks } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance } from "../formElements"
import UseDesigner from "../hooks/useDesigner"
import { useForm, Controller } from "react-hook-form"

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
    propertiesComponent: PropertiesComponent,
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}


function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const { updateElement } = UseDesigner()
    const element = elementInstance as CustomInstance
    const { label, required, placeholder, helperText } = element.extraAttributes

    type FieldValues = {
        label: string;
        placeholder: string;
        helperText: string;
        required: boolean;
    };

    // Initialize the form with existing values
    const form = useForm<FieldValues>({
        defaultValues: {
            label,
            placeholder,
            helperText,
            required,
        },
    });

    // Called when the "Apply Changes" button is pressed
    function applyChanges(values: FieldValues) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                ...values,
            },
        })
    }

    return (
        <form
            onSubmit={form.handleSubmit(applyChanges)}
            className="space-y-6 bg-gray-900 text-gray-200 p-6 rounded-xl"
        >
            {/* Label */}
            <div>
                <label htmlFor="label" className="block text-sm font-medium mb-1">
                    Label
                </label>
                <Controller
                    name="label"
                    control={form.control}
                    rules={{ required: "Enter field name" }}
                    render={({ field }) => (
                        <input
                            {...field}
                            id="label"
                            className={`w-full bg-gray-800 border rounded-lg p-2 focus:outline-none focus:ring-2 ${form.formState.errors.label
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-700 focus:ring-blue-500"
                                }`}
                        />
                    )}
                />
                {form.formState.errors.label && (
                    <p className="text-xs text-red-500 mt-1">
                        {form.formState.errors.label.message}
                    </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                    The label of the field. <br /> It will be displayed above the field.
                </p>
            </div>

            {/* Placeholder */}
            <div>
                <label
                    htmlFor="placeholder"
                    className="block text-sm font-medium mb-1"
                >
                    Placeholder
                </label>
                <Controller
                    name="placeholder"
                    control={form.control}
                    render={({ field }) => (
                        <input
                            {...field}
                            id="placeholder"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}
                />
                <p className="text-xs text-gray-400 mt-1">
                    The placeholder of the field.
                </p>
            </div>

            {/* Helper Text */}
            <div>
                <label htmlFor="helperText" className="block text-sm font-medium mb-1">
                    Helper text
                </label>
                <Controller
                    name="helperText"
                    control={form.control}
                    render={({ field }) => (
                        <input
                            {...field}
                            id="helperText"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}
                />
                <p className="text-xs text-gray-400 mt-1">
                    The helper text of the field. <br /> It will be displayed below the
                    field.
                </p>
            </div>

            {/* Required */}
            <div className="flex items-center justify-between">
                <div>
                    <label htmlFor="required" className="text-sm font-medium">
                        Required
                    </label>
                    <p className="text-xs text-gray-400">
                        Whether the field is required.
                    </p>
                </div>
                <Controller
                    name="required"
                    control={form.control}
                    render={({ field }) => (
                        <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => {
                                field.onChange(e.target.checked)
                                form.handleSubmit(applyChanges)() // auto apply on toggle
                            }}
                            className="w-10 h-5 appearance-none bg-gray-700 rounded-full relative cursor-pointer transition-all
                before:absolute before:content-[''] before:w-4 before:h-4 before:bg-white before:rounded-full 
                before:top-0.5 before:left-0.5 before:transition-all
                checked:before:translate-x-5 checked:bg-blue-600"
                        />
                    )}
                />
            </div>

            {/* Apply Changes Button */}
            <button
                type="submit"
                className=" cursor-pointer w-[100px] mt-4 mx-auto py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition"
            >
                Apply
            </button>
        </form>
    )
}


function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { label, required, placeholder, helperText } = element.extraAttributes

    return (
        <div className="flex flex-col gap-2 w-full text-sm bg-gray-800/70 p-4 ">
            <label className="text-gray-200 text-[1.3rem] tracking-wide">
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
                <p className="text-sm text-gray-500 mt-1"> {helperText} </p>
            )}
        </div>
    )
}
