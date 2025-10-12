import React from "react";

export const FormCardSkeleton: React.FC = () => {
    return (
        <div className="w-64 h-66  bg-[#111827] border border-gray-800 rounded-xl p-4 animate-pulse flex flex-col gap-2 text-white shadow-md">
            {/* Header (title + badge placeholder) */}
            <div className="flex justify-between items-center mb-1">
                <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
                <div className="h-4 w-10 bg-gray-700 rounded"></div>
            </div>

            {/* Time */}
            <div className="h-3 w-1/3 bg-gray-700 rounded mb-2"></div>

            {/* Description (2 lines like the real FormCard) */}
            <div className="h-3 w-full bg-gray-700 rounded"></div>
            <div className="h-3 w-3/4 bg-gray-700 rounded"></div>

            {/* Button */}
            <div className="h-9 w-full bg-gray-700 rounded-lg mt-2"></div>
        </div>
    );
};
