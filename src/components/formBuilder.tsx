"use client";

import React from "react";
import {
    Type,
    Heading1,
    Heading2,
    SeparatorHorizontal,
    Text,
    AlignJustify,
    Nut,
    //   Textarea,
    ListChecks,
    Calendar,
    Hash,
    ChevronRight,
    LayoutDashboard,
} from "lucide-react";
import { Form } from "@prisma/client"
import PreviewDialogBtn from "./previewDialogBtn";
import SaveFormBtn from "./saveFormBtn";
import PublishFormBtn from "./publishFormBtn";
import Designer from "./designer";



export default function FormBuilder({ form }: { form: Form }) {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
            {/* Top Bar */}
            <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-gray-950/70 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">Form: {form.name}</span>
                </div>

                <div className="flex items-center gap-3">
                    <PreviewDialogBtn />
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

            <div
                className="flex flex-1"
                style={{
                    backgroundImage: "url('/charlie-brown.svg')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "auto",
                    backgroundPosition: "center",
                    backgroundBlendMode: "overlay",
                }}
            >
                {/* Left: Form Designer Area */}
                <main className="flex-1 flex items-center justify-center bg-gray-950/60 border-r border-gray-800">
                    <div className="w-[70%] h-[80%] border-2 border-dashed border-gray-700 rounded-2xl flex items-center justify-center text-gray-500 text-lg hover:border-emerald-500 hover:text-emerald-400 transition">
                        Drop here
                    </div>
                </main>

                {/* Right: Sidebar */}
                <Designer />
            </div>

            {/* Footer Info */}
            <footer className="border-t border-gray-800 bg-gray-950/70 py-3 text-center text-xs text-gray-500">
                Designed with 💚 by FormBuilder — ID: {form.id}
            </footer>
        </div>
    );
}
