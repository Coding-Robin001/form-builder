"use client";

import { SendHorizontal } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { FormElementInstance, FormElements } from "./formElements";
import Toast from "./toast";

const FormSubmitComponent = ({ formUrl, formContent, }: { formUrl: string; formContent: FormElementInstance[] }) => {

    const [toast, setToast] = useState<{ message: string; type?: "success" | "error"; } | null>(null);
    const [renderKey, setRenderKey] = useState(new Date().getTime())

    const [submitted, setSubmitted] = useState(false)

    const formValues = useRef<{ [key: string]: string }>({})
    const formErrors = useRef<{ [key: string]: boolean }>({})

    const validateForm: () => boolean = useCallback(() => {
        for (const field of formContent) {
            const actualValue = formValues.current[field.id] || ""
            const valid = FormElements[field.type].validate(field, actualValue)

            if (!valid) {
                formErrors.current[field.id] = true
            }
        }

        if (Object.keys(formErrors.current).length > 0) {
            return false
        }

        return true

    }, [formContent])

    const submitValue = useCallback((key: string, value: string) => {
        formValues.current[key] = value
    }, [])

    const submitForm = () => {
        formErrors.current = {}
        const validForm = validateForm()
        if (!validForm) {
            setRenderKey(new Date().getTime())
            setToast({ message: "check the form for errors", type: "error" });
        }
        console.log('form values: ', formValues.current)
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex items-center justify-center p-6 text-white">
            <div className="w-full max-w-lg bg-gray-950/60 border border-gray-800 rounded-2xl shadow-[0_0_35px_6px_rgba(16,185,129,0.15)] backdrop-blur-lg p-10 space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    {/* <h2>{formValues.current}</h2>  */}
                    <h1 className="text-3xl font-bold tracking-tight text-emerald-400">
                        Submit Form
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Fill in the details below and send your response securely.
                    </p>
                </div>

                <div
                    key={renderKey}
                    className="space-y-4 flex flex-col"
                >
                    {/* Dynamic Form Fields */}
                    {formContent.map((element) => {
                        const FormElement = FormElements[element.type].formComponent;
                        return (
                            <div
                                key={element.id}
                                className="bg-gray-900/60 p-2 rounded-xl border border-gray-800 hover:border-emerald-500/40 transition"
                            >
                                <FormElement
                                    elementInstance={element}
                                    submitValue={submitValue}
                                    isInvalid={formErrors.current[element.id]}
                                    defaultValue={formValues.current[element.id]}
                                />
                            </div>
                        );
                    })}

                    {/* Submit Button */}
                    <button
                        onClick={() => submitForm()}
                        className="cursor-pointer mt-6 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] transition font-semibold tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                    >
                        <SendHorizontal className="cursor-pointer w-5 h-5" />
                        <span>Submit</span>
                    </button>

                </div>

                {/* Footer Note */}
                <p className="text-center text-gray-500 text-xs">
                    Powered by <span className="text-emerald-400">FormMagic</span>
                </p>
            </div>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default FormSubmitComponent;
