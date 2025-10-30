"use client";

import React from "react";

export default function PreviewDialog({ onClose }: { onClose: () => void }) {
    return (
        <div
            
            className="border-4  fixed top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center bg-gray/90 bg-opacity-90 backdrop-blur-md"
        >
            <h2 onClick={onClose}>close btn</h2>
            <div
                onClick={(e) => e.stopPropagation()}
                className="border-2  w-[800px] h-[600px] bg-[url('/charlie-brown.svg')] bg-repeat bg-center bg-gray/80 border border-red-500 rounded-xl shadow-2xl flex items-center justify-center text-white text-2xl"
            >
                <h1>form preview</h1>
            </div>
        </div>
    );
}
