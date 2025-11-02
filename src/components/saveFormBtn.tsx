import React, { useState, useTransition } from "react";
import { Loader2, Save } from "lucide-react";
import UseDesigner from "./hooks/useDesigner";
import { updateFormContent } from "@/actions/form";
import Toast from "./toast";

function SaveFormBtn({ id }: { id: number }) {

  const [toast, setToast] = useState<{ message: string; type?: "success" | "error"; } | null>(null);

  const { elements } = UseDesigner()
  const [loading, startTransition] = useTransition()

  const updateForm = async () => {
    try {
      const jsonElements = JSON.stringify(elements)
      await updateFormContent(id, jsonElements)
      setToast({ message: "Form created successfully!", type: "success" });

    } catch (error) {
      setToast({ message: "Something went wrong.", type: "error" });
    }
  }

  return (
    <>

      <button
        className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-black rounded-lg shadow-lg shadow-emerald-500/30 transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={loading}
        onClick={() => {
          startTransition(updateForm);
        }}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin text-black" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        <span>{loading ? "Saving..." : "Save"}</span>
      </button>


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

export default SaveFormBtn;
