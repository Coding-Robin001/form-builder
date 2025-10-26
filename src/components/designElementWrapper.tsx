import { useState } from "react"
import { FormElementInstance, FormElements } from "./formElements"
import UseDesigner from "./hooks/useDesigner"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import { Trash2Icon } from "lucide-react"


function DesignerElementWrapper({ element }: { element: FormElementInstance }) {

    const { removeElement } = UseDesigner()

    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false)

    const topHalfDroppableZone = useDroppable({
        id: element.id + "-top",
        data: { type: element.type, elementId: element.id, isTopHalfDesignerElement: true, }
    })

    const bottomHalfDroppableZone = useDroppable({
        id: element.id + "-bottom",
        data: { type: element.type, elementId: element.id, isBottomHalfDesignerElement: true, }
    })

    const draggable = useDraggable({
        id: element.id + "-drag-handler",
        data: { type: element.type, elementId: element.id, isDesignerElement: true }
    })

    const DesignerElement = FormElements[element.type].designerComponent

    if (draggable.isDragging) return null
    return (
        <div
            ref={draggable.setNodeRef}
            {...draggable.listeners}
            {...draggable.attributes}
            onMouseEnter={() => { setMouseIsOver(true) }}
            onMouseLeave={() => { setMouseIsOver(false) }}
            className='w-full relative flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset my-[0.2rem]'
        >

            {/* top droppable zone */}
            <div ref={topHalfDroppableZone.setNodeRef} className='absolute  w-full h-1/2 rounded-t'></div>

            {/* bottom droppable zone */}
            <div ref={bottomHalfDroppableZone.setNodeRef} className='absolute  w-full bottom-0 h-1/2 rounded-b'></div>


            {mouseIsOver && (
                <>
                    {/* Dark blur overlay */}
                    <div className="absolute inset-0 bg-black/60  z-40 transition-opacity duration-300" />

                    {/* Trash button (always above overlay) */}
                    <div className="absolute right-0 top-0 h-full flex items-center justify-center z-50">
                        <button
                            onClick={() => removeElement(element.id)}
                            className="cursor-pointer flex items-center justify-center h-full px-2 border rounded-md rounded-l-none bg-red-500 hover:bg-red-600 transition"
                        >
                            <Trash2Icon className="h-6 w-6 text-white" />
                        </button>
                    </div>

                    {/* Center text (above overlay too) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-pulse">
                        <p className="text-muted-foreground text-md">
                            Click for properties or drag to move
                        </p>
                    </div>
                </>
            )}

            {
                topHalfDroppableZone.isOver && (
                    <div className="bg-white absolute top-0 w-full rounded-md h-[7px] rounded-b-none"></div>
                )
            }

             {
                bottomHalfDroppableZone.isOver && (
                    <div className="bg-white absolute bottom-0 w-full rounded-md h-[7px] rounded-t-none"></div>
                )
            }


            <div className={`${mouseIsOver && 'opacity-40'} `}>
                <DesignerElement elementInstance={element} />
            </div>

        </div>
    )
}


export default DesignerElementWrapper