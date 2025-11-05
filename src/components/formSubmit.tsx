"use client";

import { CheckCircle2, Loader2, SendHorizontal } from "lucide-react";
import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./formElements";
import Toast from "./toast";
import { submitForm } from "@/actions/form";

const FormSubmitComponent = ({ formUrl, formContent, }: { formUrl: string; formContent: FormElementInstance[] }) => {

    const [toast, setToast] = useState<{ message: string; type?: "success" | "error"; } | null>(null);
    const [renderKey, setRenderKey] = useState(new Date().getTime())

    const [submitted, setSubmitted] = useState(false)

    const [pending, startTransition] = useTransition()

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

    const submitFormHandler = async () => {
        formErrors.current = {}
        const validForm = validateForm()
        if (!validForm) {
            setRenderKey(new Date().getTime())
            setToast({ message: "something went wrong!", type: "error" });
        }
        try {
            const jsonContent = JSON.stringify(formValues.current)
            await submitForm(formUrl, jsonContent)
            setSubmitted(true)
        } catch (error) {
            setToast({ message: "check the form for errors", type: "error" });
        }
        console.log('form values: ', formValues.current)
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center text-white p-6">
                <div className="relative w-[320px] md:w-[400px] p-6 rounded-xl bg-gray-900/70 border border-gray-800 shadow-[0_0_25px_rgba(59,130,246,0.4)] backdrop-blur-md text-center animate-fadeIn">
                    {/* bottom glow */}
                    <div className="absolute inset-x-0 -bottom-[2px] h-[4px] bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 blur-md rounded-full opacity-80"></div>

                    <div className="flex flex-col items-center gap-4">
                        <CheckCircle2 className="w-15 h-15 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
                        <h1 className="text-[3rem] md:text-[2rem] font-semibold tracking-wide text-gray-100">
                            Form submitted
                        </h1>
                        <p className="text-gray-400 text-md">
                            Your response has been recorded successfully.
                        </p>
                    </div>
                </div>

                {/* simple fade-in animation */}
                <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
            </div>
        )
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


                    <button
                        disabled={pending}
                        onClick={() => startTransition(submitFormHandler)}
                        className={`cursor-pointer mt-6 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl ${pending ? "bg-emerald-500/70 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500"} active:scale-[0.98] transition font-semibold tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.25)]`}
                    >
                        {pending ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin text-white" />
                                <span className="text-gray-100">Submitting...</span>
                            </>
                        ) : (
                            <>
                                <SendHorizontal className="w-5 h-5" />
                                <span>Submit</span>
                            </>
                        )}
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
