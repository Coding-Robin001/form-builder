"use client";

import { Form } from "@prisma/client"
import PreviewDialogBtn from "./previewDialogBtn";
import SaveFormBtn from "./saveFormBtn";
import PublishFormBtn from "./publishFormBtn";
import Designer from "./designer";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import DragOverlayWrapper from "./dragOverlayWrapper";
import { useState } from "react";
import PreviewDialog from "./previewDialog";


export default function FormBuilder({ form }: { form: Form }) {

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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

    return (
        <DndContext sensors={sensors}>
            <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
                {/* Top Bar */}
                <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-gray-950/70 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">Form: {form.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <PreviewDialogBtn onOpen={() => setIsPreviewOpen(true)} />
                        {
                            !form.published && (
                                <>
                                    <SaveFormBtn />
                                    <PublishFormBtn />
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

                {/* Preview Dialog — OUTSIDE Designer, INSIDE App */}
                {isPreviewOpen && <PreviewDialog onClose={() => setIsPreviewOpen(false)} />}


            </div>
            <DragOverlayWrapper />
        </DndContext>
    );
}
