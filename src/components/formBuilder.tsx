"use client";

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


export default function FormBuilder({ form }: { form: Form }) {

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isPublishOpen, setIsPublishOpen] = useState(false);
    const { setElements } = UseDesigner()
    const [isReady, setIsReady] = useState(false)

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

    if (!isReady) {
        return (
            <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (form.published) {
        return (
            <>
            </>
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
                    Designed with 💚 by FormBuilder — ID: {form.id}
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
