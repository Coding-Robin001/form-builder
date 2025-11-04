// "use client";
import { SendHorizontal } from "lucide-react";
import { getFormContentByUrl } from "@/actions/form";

export default async function FormSubmitPage({ params }: { params: { formUrl: string } }) {

    const form = await getFormContentByUrl(params.formUrl)

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-gray-900/70 border border-gray-800 rounded-2xl shadow-[0_0_30px_6px_rgba(16,185,129,0.12)] backdrop-blur-md p-8 space-y-6">

                <h2 className="text-lg font-semibold text-white tracking-wide">
                    Text Field
                </h2>

                <form className="space-y-4">
                    {/* Input Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-300">Placeholder</label>
                        <input
                            type="text"
                            placeholder="Enter text..."
                            // value={inputValue}
                            // onChange={(e) => setInputValue(e.target.value)}
                            className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        />
                    </div>

                    {/* Helper Text */}
                    <p className="text-xs text-gray-500">Helper text</p>

                    {/* Submit Button */}
                    <button
                       
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-500 text-black shadow-[0_0_20px_2px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_3px_rgba(16,185,129,0.35)] transition-all"
                    >
                        <SendHorizontal className="w-4 h-4" />
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
