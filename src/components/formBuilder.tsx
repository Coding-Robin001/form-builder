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



export default function FormBuilder({ form }: { form: Form }) {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
            {/* Top Bar */}
            <header className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-gray-950/70 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">Form: {form.name}</span>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-emerald-400 transition">
                        Preview
                    </button>
                    <button className="px-4 py-1.5 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-black rounded-lg shadow-lg shadow-emerald-500/30 transition">
                        Save
                    </button>
                    <button className="px-4 py-1.5 text-sm font-semibold bg-emerald-400 hover:bg-emerald-300 text-black rounded-lg transition">
                        Publish
                    </button>
                </div>
            </header>

            {/* Main Layout */}
            <div className="flex flex-1">
                {/* Left: Form Designer Area */}
                <main className="flex-1 flex items-center justify-center bg-gray-950/60 border-r border-gray-800">
                    <div className="w-[70%] h-[80%] border-2 border-dashed border-gray-700 rounded-2xl flex items-center justify-center text-gray-500 text-lg hover:border-emerald-500 hover:text-emerald-400 transition">
                        Drop here
                    </div>
                </main>

                {/* Right: Sidebar */}
                <aside className="w-72 bg-gray-950/70 border-l border-gray-800 p-5 flex flex-col gap-6 overflow-y-auto">
                    {/* Layout Elements */}
                    <section>
                        <h2 className="text-sm uppercase text-gray-400 font-semibold mb-3 tracking-wider">
                            Layout elements
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "Title", icon: Heading1 },
                                { label: "Subtitle", icon: Heading2 },
                                { label: "Paragraph", icon: Text },
                                { label: "Spacer", icon: AlignJustify },
                                { label: "Separator", icon: SeparatorHorizontal },
                            ].map(({ label, icon: Icon }) => (
                                <div
                                    key={label}
                                    className="flex flex-col items-center justify-center bg-gray-900/60 hover:bg-gray-800 text-sm font-medium text-gray-300 rounded-lg py-3 cursor-pointer border border-gray-800 hover:border-emerald-500/40 transition"
                                >
                                    <Icon className="w-5 h-5 text-emerald-400 mb-1" />
                                    <span>{label}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Form Elements */}
                    <section>
                        <h2 className="text-sm uppercase text-gray-400 font-semibold mb-3 tracking-wider">
                            Form elements
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "Text Field", icon: ListChecks },
                                { label: "Text Area", icon: Calendar },
                                { label: "Select", icon: ListChecks },
                                { label: "Number", icon: Hash },
                                { label: "Date Picker", icon: Calendar },
                                { label: "Checkbox", icon: LayoutDashboard },
                            ].map(({ label, icon: Icon }) => (
                                <div
                                    key={label}
                                    className="flex flex-col items-center justify-center bg-gray-900/60 hover:bg-gray-800 text-sm font-medium text-gray-300 rounded-lg py-3 cursor-pointer border border-gray-800 hover:border-emerald-500/40 transition"
                                >
                                    <Icon className="w-5 h-5 text-emerald-400 mb-1" />
                                    <span>{label}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>

            {/* Footer Info */}
            <footer className="border-t border-gray-800 bg-gray-950/70 py-3 text-center text-xs text-gray-500">
                Designed with 💚 by FormBuilder — ID: {form.id}
            </footer>
        </div>
    );
}
