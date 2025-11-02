"use client";
import React, { useState, useTransition } from "react";
import { Loader2, Rocket, X } from "lucide-react";
import Toast from "./toast";
import { publishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

export default function PublishAlertPopup({ onClose, formName, id }: { onClose: () => void; formName: string; id: number }) {
    const router = useRouter()

    const [loading, startTransition] = useTransition()
    const [toast, setToast] = useState<{ message: string; type?: "success" | "error"; } | null>(null);

    const publishFormHandler = async () => {
        try {
            await publishForm(id)
            setToast({ message: "your orm is now available to the public for submission!", type: "success" });
            setTimeout(() => {
                onClose();           // Close the popup
                router.refresh();    // Refresh the page to show updated data
            }, 2000);
        } catch (error) {
            setToast({ message: "Something went wrong.", type: "error" });
        }
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
            {/* Modal box */}
            <div className="bg-gray-900 text-gray-100 w-[400px] rounded-lg shadow-xl border border-gray-700 p-6 space-y-4">
                {/* Close button (optional, top right corner) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Title */}
                <h2 className="text-lg font-semibold text-white">
                    Are you absolutely sure?
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed">
                    This action cannot be undone. After publishing, you will not be able
                    to edit <span className="font-medium text-gray-300">{formName.toLocaleUpperCase()}</span> form.
                    <br />
                    <br />
                    By publishing this form, it will be made visible to the public and
                    users will be able to submit responses.
                </p>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className="cursor-pointer px-4 py-1.5 text-sm font-medium rounded-md border border-gray-600 text-gray-300 hover:bg-gray-800 transition"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={() => startTransition(publishFormHandler)}
                        className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-md bg-emerald-600 hover:bg-emerald-500 text-black shadow-md shadow-emerald-500/30 transition disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin text-black" />
                        ) : (
                            <Rocket className="w-4 h-4" />
                        )}
                        <span>{loading ? "Publishing..." : "Proceed"}</span>
                    </button>

                </div>
            </div>
            {
                toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )
            }
        </div>

    );
}
