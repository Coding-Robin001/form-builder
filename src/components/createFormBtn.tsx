"use client";

import { useState } from "react";
import { PlusCircle, X } from "lucide-react";

export default function CreateFormButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button */}
      <div
        onClick={() => setIsOpen(true)}
        className="border-2 border-dashed border-white/70 hover:border-orange-400 transition rounded-2xl flex flex-col items-center justify-center h-56 cursor-pointer bg-gradient-to-r from-black via-gray-900 to-black hover:bg-[#17231c] shadow-md hover:shadow-lg hover:shadow-orange-500/20"
      >
        <PlusCircle className="w-12 h-12 text-orange-400 mb-3" />
        <p className="text-lg font-semibold text-gray-300">Create New Form</p>
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)} // close when clicking backdrop
        >
          <div
            onClick={(e) => e.stopPropagation()} // prevent backdrop close
            className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-lg w-[90%] sm:w-[500px] p-6 transform transition-all duration-300 scale-100 opacity-100"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-white">Create New Form</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: handle form creation here
                setIsOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-400 mb-1">Form Title</label>
                <input
                  type="text"
                  required
                  placeholder="Enter form title..."
                  className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Description</label>
                <textarea
                  placeholder="Short description..."
                  className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold transition"
              >
                Create Form
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
