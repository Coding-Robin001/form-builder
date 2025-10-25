import React, { useState } from 'react'
import DesignerSideBar from './designerSideBar'
import { useDroppable } from '@dnd-kit/core'
import { FormElementInstance } from './formElements'

function Designer() {


    const droppable = useDroppable({
        id: "designer-drop-area",
        data: {
            isDesignerDropArea: true,
        }
    })


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
                <div
                    ref={droppable.setNodeRef}
                    className="
      w-[70%] h-[80%]
      border-2 border-dashed border-gray-700 rounded-2xl
      text-gray-400 text-base font-medium
      relative
      flex flex-col items-center justify-start
      bg-gray-950/40
      transition-colors duration-300
    "
                >
                    {/* Center message */}
                    {!droppable.isOver && (
                        <p className="absolute inset-0 flex items-center justify-center text-gray-500 font-semibold tracking-wide">
                            Drop your form elements here
                        </p>
                    )}

                    {/* Drop highlight area */}
                    {droppable.isOver && (
                        <div
                            className="
          absolute top-0 left-0 w-full h-[120px]
          bg-gray-800/70 border-b border-gray-700
          flex items-center justify-center
          text-gray-200 font-semibold tracking-wide
          backdrop-blur-sm
          transition-all duration-200
        "
                        >
                            <span className="uppercase text-sm">Place Element</span>
                        </div>
                    )}
                </div>
            </main>


            {/* Right: Form Designer SideBar */}
            <DesignerSideBar />

        </div>
    )
}

export default Designer
