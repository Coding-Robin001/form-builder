"use client"

import { useState } from "react";
import { Loader2, PlusCircle, X } from "lucide-react";
import { createForm } from "../actions/form";
import Toast from "./toast";
import { useRouter } from "next/navigation";

export default function CreateFormButton() {

  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error"; } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const formErrors: { name?: string; description?: string } = {};
    if (!name.trim() || name.trim().length < 4) formErrors.name = "title is required and must be atleast 4 characters long";

    if (description.trim().length < 5)
      formErrors.description = "Description must be at least 5 characters long.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createForm(name, description);

      if (!result.success) {
        setServerError(result.message);
        return;
      }


      setName("");
      setDescription("");

      setToast({ message: "Form created successfully!", type: "success" });
      router.push(`/builder/${result.form?.id}`)
      setIsOpen(false);

    } catch (error: any) {
      setServerError("An unexpected error occurred.");
      setToast({ message: "Something went wrong.", type: "error" });

    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {/* Create Button */}
      <div
        onClick={() => setIsOpen(true)}
        className="border-2 border-dashed border-white/70 hover:border-orange-400 transition rounded-2xl flex flex-col items-center justify-center h-66 cursor-pointer bg-gradient-to-r from-black via-gray-900 to-black hover:bg-[#17231c] shadow-md hover:shadow-lg hover:shadow-orange-500/20"
      >
        <PlusCircle className="w-12 h-12 text-orange-400 mb-3" />
        <p className="text-lg font-semibold text-gray-300">Create New Form</p>
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-lg w-[100%] sm:w-[500px] p-7"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition"
            >
              <X className="w-7 h-7 cursor-pointer" />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-white">Create New Form</h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6">
              {/* Form Title */}
              <div>
                <label className="block text-gray-400 mb-1">Form Title</label>
                <input
                  type="text"
                  placeholder="Enter form title..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${errors.name ? "border-red-500" : "border-gray-700"
                    } text-white focus:ring-2 focus:ring-orange-500 focus:outline-none`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-400 mb-1">Description</label>
                <textarea
                  placeholder="Short description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${errors.description ? "border-red-500" : "border-gray-700"
                    } text-white focus:ring-2 focus:ring-orange-500 focus:outline-none`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Server Error */}
              {serverError && (
                <p className="text-red-500 text-sm text-center mt-2">
                  {serverError}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer flex items-center justify-center gap-2 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold transition disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Create Form"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
