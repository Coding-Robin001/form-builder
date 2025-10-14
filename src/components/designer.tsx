import React from 'react'
import DesignerSideBar from './designerSideBar'

function Designer() {
    return (
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

            {/* Right: Form Designer SideBar */}
            <DesignerSideBar />

        </div>
    )
}

export default Designer
