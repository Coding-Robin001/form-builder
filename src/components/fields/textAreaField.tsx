"use client"

import { FileText } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../formElements"
import UseDesigner from "../hooks/useDesigner"
import { useForm, Controller } from "react-hook-form"
import { useEffect, useState } from "react"

const type: ElementsType = "TextAreaField"

const extraAttributes = {
    label: "Text Area",
    helperText: "helper text,",
    required: false,
    placeholder: "enter value here...",
    rows: 3
}

export const TextAreaFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({ id, type, extraAttributes, }),
    designerBtnElement: { icon: FileText, label: "textArea field" },
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
    defaultValue?: string
}) {

    const element = elementInstance as CustomInstance

    const [value, setValue] = useState(defaultValue || "")
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(isInvalid === true)
    }, [isInvalid])

    const { label, required, placeholder, helperText, rows } = element.extraAttributes

    return (
        <div className="flex flex-col gap-2 w-full text-sm bg-gray-800/70 p-4 rounded-lg">
            <label className={`${error && 'text-red-500'} text-gray-200 text-[1.4rem] tracking-wide`}>
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>

            <textarea
                rows={rows}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                onBlur={(e) => {
                    if (!submitValue) return
                    const valid = TextAreaFieldFormElement.validate(element, e.target.value)
                    setError(!valid)
                    if (!valid) return
                    submitValue(element.id, e.target.value)
                }}
                value={value}
                className={`${error && 'text-red-500 border-2 border-red-500'} w-full bg-gray-900/60 text-gray-100 placeholder:text-gray-500 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-100/50 shadow-inner transition-all duration-200`}
            />

            {helperText && (
                <p className={`${error && 'text-red-500'} text-md text-gray-300 mt-1`}>{helperText}</p>
            )}
        </div>

    )
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { label, required, placeholder, helperText, rows } = element.extraAttributes

    return (
        <div className="flex flex-col gap-2 w-full text-sm bg-gray-800/70 p-4 border border-gray-600/60">
            <label className="text-muted-foreground text-[1.25rem] tracking-wide">
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>
            <textarea
                type="text"
                disabled
                readOnly
                placeholder={placeholder}
                className="w-full bg-gray-800/50 text-gray-400 placeholder:text-gray-400 
             border border-gray-700/50 rounded-lg px-3 py-2 
             shadow-inner opacity-90 cursor-not-allowed 
             focus:outline-none focus:ring-0 
             transition-all duration-200"
            />

            {helperText && (
                <p className="text-md text-gray-300 mt-1"> {helperText} </p>
            )}
        </div>
    )
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const { updateElement } = UseDesigner()
    const element = elementInstance as CustomInstance
    const { label, required, placeholder, helperText, rows } = element.extraAttributes

    type FieldValues = {
        label: string;
        placeholder: string;
        helperText: string;
        required: boolean;
        rows: number;
    };

    // Initialize the form with existing values
    const form = useForm<FieldValues>({
        defaultValues: {
            label,
            placeholder,
            helperText,
            required,
            rows
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


            {/* rows*/}
            <div>
                <label htmlFor="helperText" className="block text-sm font-medium mb-1">
                    Rows: {form.watch("rows")}
                </label>
                <Controller
                    name="rows"
                    control={form.control}
                    render={({ field }) => (
                        <input
                            type="range"
                            id="rows"
                            min={1}
                            max={10}
                            step={1}
                            value={field.value ?? 4}
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
                    )}
                />
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


