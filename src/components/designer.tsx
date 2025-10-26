import DesignerSideBar from './designerSideBar'
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core'
import UseDesigner from './hooks/useDesigner'
import { ElementsType, FormElementInstance, FormElements } from './formElements'
import { idGenerator } from '@/lib/idGenerator'

function Designer() {

    const { elements, addElement } = UseDesigner()


    const droppable = useDroppable({
        id: "designer-drop-area",
        data: {
            isDesignerDropArea: true,
        }
    })

    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {
            const { active, over } = event
            if (!active || !over) return

            const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement
            if (isDesignerBtnElement) {
                const type = active?.data?.current?.type
                const newElement = FormElements[type as ElementsType].construct(idGenerator())
                addElement(0, newElement)
            }
            console.log("drag end event ", event)
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
            <main className="p-2 min-h-[100vh] flex-1 flex items-center justify-center bg-gray-950/60 border-r border-gray-800">
                <div
                    ref={droppable.setNodeRef}
                    className="p-4 w-[80%] h-[100%] border-2 border-dashed border-gray-700 rounded-2xl  text-gray-400 text-base font-medium  relative flex flex-col items-center justify-start bg-gray-950/40 transition-colors duration-300"
                >
                    {/* Center message */}
                    {!droppable.isOver && elements.length === 0 && (
                        <p className="absolute inset-0 flex items-center justify-center text-gray-500 font-semibold tracking-wide">
                            Drop your form elements here
                        </p>
                    )}

                    {/* Drop highlight area */}
                    {droppable.isOver && (
                        <div
                            className="absolute top-0 left-0 w-full h-[120px] bg-gray-800/70 border-b border-gray-700 flex items-center justify-center text-gray-200 font-semibold tracking-wide backdrop-blur-sm transition-all duration-200 "
                        >
                            <span className="uppercase text-sm">Place Element</span>
                        </div>
                    )}

                    {/* rendr list of elements */}
                    {
                        elements.length > 0 &&
                        elements?.map((element) => (
                            <DesignerElementWrapper key={element.id} element={element} />
                        ))
                    }
                </div>
            </main>

            {/* Right: Form Designer SideBar */}
            <DesignerSideBar />

        </div>
    )
}


function DesignerElementWrapper({ element }: { element: FormElementInstance }) {

    const topHalf = useDroppable({
        id: element.id + "-top",
        data: {
            type: element.type,
            elementId: element.id,
            isTopHalfDesignerElement: true,
        }
    })

    const bottomHalf = useDroppable({
        id: element.id + "-bottom",
        data: {
            type: element.type,
            elementId: element.id,
            isBottomHalfDesignerElement: true,
        }
    })

    const DesignerElement = FormElements[element.type].designerComponent

    return (
        <div className='w-full relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset'>

            {/* top droppable zone */}
            <div ref={topHalf.setNodeRef} className='absolute bg-green-500 w-full h-1/2 rounded-t'></div>

            {/* bottom droppable zone */}
            <div ref={bottomHalf.setNodeRef} className='absolute bg-red-500 w-full bottom-0 h-1/2 rounded-b'></div>

            <DesignerElement elementInstance={element} />
        </div>
    )
}

export default Designer
