"use client";

import { ArrowLeft, BadgeCheckIcon, SkipBackIcon, StepBack, StepBackIcon, X } from "lucide-react";
import React from "react";
import UseDesigner from "./hooks/useDesigner";
import { FormElements } from "./formElements";

export default function PreviewFormPopup({ onClose, formName }: { onClose: () => void, formName: string }) {

    const { elements } = UseDesigner()
    return (
        <div
            className="p-4 fixed top-0 left-0 w-screen h-screen z-[9999] flex flex-col gap-8 items-center bg-gray/90 bg-opacity-90 backdrop-blur-md bg-[url('/charlie-brown.svg')] overflow-y-auto bg-repeat bg-center bg-gray/80 "
        >
            <div className="w-full border-1 border-gray-700 py-2 px-4 relative flex justify-between items-center bg-black/60 bg-opacity-50">
                <div>
                    <h1 className="mb-1">form preview</h1>
                    <h1>this is how your form will look to user after you publish</h1>
                </div>
                <div
                    onClick={onClose}>
                    <X className=" w-8 h-8 cursor-pointer hover:text-red-500" />
                </div>
            </div>
            <h2 className="text-[1.6rem]">{formName.toLocaleUpperCase()}</h2>
            <div
                onClick={(e) => e.stopPropagation()}
                className="border-2 flex flex-col gap-2 p-4 w-[650px]  border-gray-500 rounded-lg shadow-[0_0_25px_4px_rgba(34,197,94,0.2)] bg-black/60 bg-opacity-50"
            >
                {

                    elements.length > 0 ?
                        elements.map((element) => {
                            const FormComponent = FormElements[element.type].formComponent
                            return <FormComponent key={element.id} elementInstance={element} />
                        })
                        :
                        <div className="h-full text-[1.4rem] flex flex-col gap-2 justify-center items-center">
                            <h2>add elements to list to preview them!</h2>
                            <button
                                className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold bg-emerald-400 hover:bg-emerald-300 text-black rounded-lg transition cursor-pointer"
                                onClick={onClose}><ArrowLeft /> back to builder page
                            </button>
                        </div>
                }
            </div>
        </div>
    );
}
