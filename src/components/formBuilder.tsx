"use client"

import { Form } from "@prisma/client"
import SaveFormBtn from "./saveFormBtn";
import PublishFormBtn from "./publishFormBtn";
import Designer from "./designer";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import DragOverlayWrapper from "./dragOverlayWrapper";
import { useEffect, useState } from "react";
import PreviewFormPopup from "./previewFormPopup";
import PreviewFormBtn from "./previewFormBtn";
import UseDesigner from "./hooks/useDesigner";
import LoadingSpinner from "./loadingSpinner";
import PublishAlertPopup from "./publishAlertPopup";
import { CheckCircle2, Share2, Home, FileText, Copy } from "lucide-react";
import Link from "next/link";
import ReactConfetti from "react-confetti";


export default function FormBuilder({ form }: { form: Form }) {

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isPublishOpen, setIsPublishOpen] = useState(false);
    const { setElements } = UseDesigner()
    const [isReady, setIsReady] = useState(false)
    const [copied, setCopied] = useState(false);

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10
        }
    })

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 300,
            tolerance: 5
        }
    })

    const sensors = useSensors(mouseSensor, touchSensor)

    useEffect(() => {
        if (isReady) return
        const elements = JSON.parse(form.content)
        setElements(elements)
        const readyTimeout = setTimeout(() => setIsReady(true), 500);
        return () => clearTimeout(readyTimeout)
    }, [form, setElements])

    const handleCopy = () => {
        navigator.clipboard.writeText("");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isReady) {
        return (
            <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    const formLink = `${window.location.origin}/submit/${form.shareURL}`

    // screen after pubishing form
    if (form.published) {
        return (
            <div className="fixed inset-0 z-50 overflow-hidden">
                <ReactConfetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={1000}
                    style={{
                        pointerEvents: "none",
                    }}
                />
                <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex flex-col items-center justify-center text-white p-6">
                    <div className="w-full max-w-md bg-gray-900/60 rounded-2xl shadow-[0_0_25px_5px_rgba(16,185,129,0.15)] backdrop-blur-lg border border-gray-800 p-8 text-center space-y-6">
                        <div className="flex flex-col items-center gap-4">
                            <CheckCircle2 className="w-17 h-17 text-emerald-400" />
                            <h1 className="text-3xl font-bold tracking-wide">Form Published</h1>
                            <p className="text-gray-400 text-md">
                                Your form is live! Share link with users to let them view and submit.
                            </p>
                        </div>

                        <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-3 flex items-center justify-between">
                            <span className="text-gray-300 text-sm truncate">{formLink}</span>
                            <button
                                onClick={handleCopy}
                                className="cursor-pointer ml-2 px-3 py-1.5 text-sm bg-emerald-600 hover:bg-emerald-500 rounded-md text-black font-semibold transition"
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>

                        <div className="flex justify-between text-sm text-gray-400">
                            <Link
                                href="/"
                                className="flex items-center gap-1 hover:text-emerald-400 transition"
                            >
                                <Home className="w-4 h-4" />
                                Go back home
                            </Link>
                            <Link
                                href={`/forms/${form.id}`}
                                className="flex items-center gap-1 hover:text-emerald-400 transition"
                            >
                                Form details
                                <FileText className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-gray-400 pt-3 border-t border-gray-800 text-sm">
                            <Share2 className="w-4 h-4" />
                            Share this form with others
                        </div>
                    </div>
                </div >
            </div>
        )
    }


    return (
        <DndContext sensors={sensors}>
            <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
                {/* Top Bar */}
                <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-gray-950/70 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">Form: {form.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <PreviewFormBtn onOpen={() => setIsPreviewOpen(true)} />
                        {
                            !form.published && (
                                <>
                                    <SaveFormBtn id={form.id} />
                                    <PublishFormBtn onOpen={() => setIsPublishOpen(true)} />
                                </>
                            )
                        }
                    </div>
                </nav>

                {/*main designer component */}
                <Designer />

                {/* Footer Info */}
                <footer className="border-t border-gray-800 bg-gray-950/70 py-3 text-center text-xs text-gray-500">
                    Design for {form.name}
                </footer>


                {/* Preview Dialog */}
                {
                    isPreviewOpen &&
                    <PreviewFormPopup
                        formName={form.name}
                        onClose={() => setIsPreviewOpen(false)}
                    />
                }

                {/* publish Dialog */}
                {isPublishOpen &&
                    <PublishAlertPopup
                        id={form.id}
                        formName={form.name}
                        onClose={() => setIsPublishOpen(false)}
                    />}

            </div>
            <DragOverlayWrapper />
        </DndContext>
    );
}
