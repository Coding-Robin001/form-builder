"use client"

import { ChevronsUpDown } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../formElements"
import UseDesigner from "../hooks/useDesigner"
import { useForm, Controller } from "react-hook-form"
import { useEffect, useState } from "react"
import Toast from "../toast"

const type: ElementsType = "SelectField"

const extraAttributes = {
    label: "Select field",
    helperText: "helper text,",
    required: false,
    placeholder: "select option",
    options: []
}

export const SelectFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({ id, type, extraAttributes, }),
    designerBtnElement: { icon: ChevronsUpDown, label: "select field" },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: (FormElement: FormElementInstance, currentValue: string): boolean => {
        const element = FormElement as CustomInstance
        if (element.extraAttributes.required) {
            return currentValue.length > 0
        }
        return true
    },
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}


function FormComponent({
    elementInstance,
    submitValue,
    isInvalid,
    defaultValue
}: {
    elementInstance: FormElementInstance;
    submitValue: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
}) {

    const element = elementInstance as CustomInstance;

    const [value, setValue] = useState(defaultValue || "");
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);

    const { label, required, placeholder, helperText, options } = element.extraAttributes;

    return (
        <div className="flex flex-col gap-2 w-full text-sm bg-gray-800/70 p-4 rounded-lg">
            <label className={`${error && 'text-red-500'} text-gray-200 text-[1.4rem] tracking-wide`}>
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>

            {/* SELECT FIELD */}
            <select
                value={value}   // <= controlled value
                onChange={(e) => {
                    const newValue = e.target.value;
                    setValue(newValue)
                    if (!submitValue) return
                    const valid = SelectFieldFormElement.validate(element, value)
                    setError(!valid)
                    submitValue(element.id, newValue); // <= send to backend logic
                }}
                className={`${error && 'border-red-500'} w-full bg-gray-900 text-gray-200 px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-emerald-500`}
            >
                {/* Placeholder (only visible when value === "") */}
                <option value="" disabled hidden>
                    {placeholder || "Select an option"}
                </option>
                {
                    options.map((option) => (
                        <option value={option} key={option}>{option}</option>
                    ))
                }
            </select>

            {helperText && (
                <p className={`${error && 'text-red-500'} text-md text-gray-300 mt-1`}>
                    {helperText}
                </p>
            )}
        </div>
    );
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { label, required, placeholder, helperText } = element.extraAttributes

    return (
        <div className="flex flex-col gap-2 w-full text-sm bg-gray-800/70 p-4 border border-gray-600/60">
            <label className="text-muted-foreground text-[1.25rem] tracking-wide">
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>

            {/* SELECT FIELD */}
            <select
                className="w-full bg-gray-900 text-gray-200 px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-emerald-500"
                defaultValue=""
            >
                {/* Placeholder */}
                <option value="" disabled hidden>
                    {placeholder || "Select an option"}
                </option>
            </select>

            {helperText && (
                <p className="text-md text-gray-300 mt-1">{helperText}</p>
            )}
        </div>
    )
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const { updateElement, setSelectedElement } = UseDesigner()
    const element = elementInstance as CustomInstance
    const { label, required, placeholder, helperText, options } = element.extraAttributes

    type FieldValues = {
        label: string;
        placeholder: string;
        helperText: string;
        required: boolean;
        options: string[];
    };

    // Initialize the form with existing values
    const form = useForm<FieldValues>({
        defaultValues: {
            label,
            placeholder,
            helperText,
            required,
            options: options || [],
        }
    })

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


            {/* select option properties */}
            {/* OPTIONS SETTINGS */}
            <div className="mt-6">
                <label className="block text-sm font-medium mb-2">
                    Options
                </label>

                {/* Add option button */}
                <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-600 bg-gray-800 hover:bg-gray-700 text-sm"
                    onClick={() => {
                        const current = form.getValues("options") || [];
                        form.setValue("options", [...current, "New option"]);
                    }}
                >
                    + Add
                </button>

                {/* List of editable options */}
                <div className="flex flex-col gap-2 mt-3">
                    {form.watch("options")?.map((option: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                            <input
                                value={option}
                                onChange={(e) => {
                                    const updated = [...form.getValues("options")];
                                    updated[index] = e.target.value;
                                    form.setValue("options", updated);
                                }}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                            />

                            {/* Remove option button */}
                            <button
                                type="button"
                                className="px-2 py-1 bg-red-600 hover:bg-red-500 rounded text-xs"
                                onClick={() => {
                                    const updated = form.getValues("options").filter(
                                        (_, i) => i !== index
                                    );
                                    form.setValue("options", updated);
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <p className="text-xs text-gray-400 mt-2">
                    Add choices that will appear in the select dropdown.
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


