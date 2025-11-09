"use client"

import { Calendar, Calendar1Icon, TextCursorInput, X } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../formElements"
import UseDesigner from "../hooks/useDesigner"
import { useForm, Controller } from "react-hook-form"
import { useEffect, useRef, useState } from "react"
import { SimpleCalendar } from "../simpleCalendar"
import { format } from "date-fns"

const type: ElementsType = "DateField"

const extraAttributes = {
    label: "Date field",
    helperText: "pick a date",
    required: false,
}

export const DateFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({ id, type, extraAttributes, }),
    designerBtnElement: { icon: Calendar, label: "date field" },
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

    const [date, setDate] = useState<Date | undefined>(
        defaultValue ? new Date(defaultValue) : undefined
    );
    const [error, setError] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const popoverRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        setError(isInvalid === true)
    }, [isInvalid])

    // Close popover on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
                setShowCalendar(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Select a date
    const handleSelectDate = (selected: Date) => {
        setDate(selected);
        setShowCalendar(false);

        if (!submitValue) return;
        const formatted = selected.toUTCString() || "";
        const valid = DateFieldFormElement.validate(element, formatted); // your validate logic can go here
        setError(!valid);
        if (valid) submitValue(element.id, formatted);
    };

    const { label, required, helperText } = element.extraAttributes

    return (
        <div className="relative flex flex-col gap-2 w-full text-sm bg-gray-800/70 p-4 rounded-lg">
            <label
                className={`${error && "text-red-500"} text-gray-200 text-[1.4rem] tracking-wide`}
            >
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>

            {/* Button that toggles calendar */}
            <button
                onClick={() => setShowCalendar((prev) => !prev)}
                className={`cursor-pointer flex items-center justify-start w-full text-left font-normal px-3 py-2 rounded-lg border transition-all duration-200 
      ${showCalendar ? "bg-gray-700 border-emerald-500" : "bg-gray-900/60 border-gray-700 hover:border-gray-500"} 
      ${error ? "border-red-500 text-red-500" : "text-gray-100"}`}
            >
                <Calendar1Icon
                    className={`mr-2 h-4 w-4 ${showCalendar ? "text-emerald-400" : "text-gray-400"}`}
                />
                {date ? (
                    <span className="text-gray-100">{date.toDateString()}{format(date, "PPP")}</span>
                ) : (
                    <span className="text-gray-500">Pick a date</span>
                )}
            </button>

            {/* Helper Text */}
            {helperText && (
                <p
                    className={`${error && "text-red-500"} text-md text-gray-300 mt-1`}
                >
                    {helperText}
                </p>
            )}

            {/* Calendar Popover */}
            {showCalendar && (
                <div
                    ref={popoverRef}
                    className="absolute left-0 top-full mt-2 z-[9999] bg-gray-900 text-gray-200 border border-gray-700 rounded-lg shadow-lg w-[280px]"
                >
                    {/* Header row with Close icon */}
                    <div className="flex items-center justify-between border-b border-gray-700 px-3 py-2">
                        <span className="text-sm font-semibold text-gray-300">Select Date</span>
                        <button
                            onClick={() => setShowCalendar(false)}
                            className="p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-gray-200 transition"
                            aria-label="Close calendar"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Calendar body */}
                    <div className="p-3">
                        <SimpleCalendar onSelect={handleSelectDate} selectedDate={date} />
                    </div>
                </div>
            )}

        </div>


    )
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
            <button className="ml-4 w-full flex justify-start text-left font-normal ">
                <Calendar1Icon className="mr-2 h-4 w-4 " />
                <span>pick a date</span>
            </button>

            {helperText && (
                <p className="text-md text-gray-300 mt-1"> {helperText} </p>
            )}
        </div>
    )
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const { updateElement } = UseDesigner()
    const element = elementInstance as CustomInstance
    const { label, required, helperText } = element.extraAttributes

    type FieldValues = {
        label: string;
        helperText: string;
        required: boolean;
    };

    // Initialize the form with existing values
    const form = useForm<FieldValues>({
        defaultValues: {
            label,
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


