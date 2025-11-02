"use client";
import React from "react";
import { X } from "lucide-react";

export default function PublishAlertPopup({ onClose, formName, id }: { onClose: () => void; formName: string; id: number }) {

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
                        className="cursor-pointer px-4 py-1.5 text-sm font-semibold rounded-md bg-emerald-600 hover:bg-emerald-500 text-black shadow-md shadow-emerald-500/30 transition"
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    );
}
