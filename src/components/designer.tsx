import DesignerSideBar from './designerSideBar'
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core'
import UseDesigner from './hooks/useDesigner'
import { ElementsType, FormElements } from './formElements'
import { idGenerator } from '@/lib/idGenerator'
import DesignerElementWrapper from './designElementWrapper'

function Designer() {

    const { elements, addElement, selectedElement, setSelectedElement, removeElement } = UseDesigner()

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
            const isDroppingOverDesignerDropArea = over?.data?.current?.isDesignerDropArea

            const isDroppingSidebarBtnElementOverDesignerDropArea = isDesignerBtnElement && isDroppingOverDesignerDropArea

            // 1st droppable scenario (drag sidebarBtnElement over to dropzone to last place/postion) 
            if (isDroppingSidebarBtnElementOverDesignerDropArea) {
                const type = active?.data?.current?.type
                const newElement = FormElements[type as ElementsType].construct(idGenerator())
                addElement(elements.length, newElement)
                return
            }

            const isDroppingOverDesignerElementTopHalf = over?.data?.current?.isTopHalfDesignerElement
            const isDroppingOverDesignerElementBottomHalf = over?.data?.current?.isBottomHalfDesignerElement

            const isDroppingOverDesignerElement = isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf

            const droppingSideBarBtnOverDesignerElement = isDesignerBtnElement && isDroppingOverDesignerElement

            // 2nd droppable scenario (drag sidebarBtnElement and drop over designerelement in dropzone)
            if (droppingSideBarBtnOverDesignerElement) {
                const type = active?.data?.current?.type
                const newElement = FormElements[type as ElementsType].construct(idGenerator())

                const overId = over?.data?.current?.elementId

                const overElementIndex = elements.findIndex((el) => el.id === overId)
                if (overElementIndex === -1) {
                    throw new Error("element not found!")
                }

                let indexForNewElement = overElementIndex //assume im on op half
                if (isDroppingOverDesignerElementBottomHalf) {
                    indexForNewElement = overElementIndex + 1
                }

                addElement(indexForNewElement, newElement)
                return
            }

            // 3rd scenario (drag a designerElement within dropzone over another designerelement changing postions)
            const isDraggingDesignerElement = active?.data?.current?.isDesignerElement
            const draggingDesignerElementOverAnotherDesignerElement = isDroppingOverDesignerElement && isDraggingDesignerElement

            if (draggingDesignerElementOverAnotherDesignerElement) {
                const activeId = active?.data?.current?.elementId
                const overId = over?.data?.current?.elementId

                const activeElementIndex = elements.findIndex((el) => el.id === activeId)
                const overElementIndex = elements.findIndex((el) => el.id === overId)

                if (activeElementIndex === -1 || overElementIndex === -1) {
                    throw new Error("element not found!")
                }

                const activeElement = { ...elements[activeElementIndex] }
                removeElement(activeId)

                let indexForNewElement = overElementIndex //assume im on op half
                if (isDroppingOverDesignerElementBottomHalf) {
                    indexForNewElement = overElementIndex + 1
                }

                addElement(indexForNewElement, activeElement)

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
            <main
                className="p-2 flex-1 flex items-center justify-center bg-gray-950/60 border-r border-gray-800"
                onClick={() => {
                    if (selectedElement) setSelectedElement(null)
                }}
            >
                <div
                    ref={droppable.setNodeRef}
                    className={`relative flex flex-col items-center justify-start w-[85%] min-h-[100vh] p-6 border-3 border-gray-700 rounded-md bg-gray-950/60 text-gray-300 font-medium transition-all duration-300 ease-in-out
    ${droppable.isOver ? 'ring-2 ring-inset border-green-500 bg-gray-900/80 shadow-[0_0_25px_5px_rgba(59,130,246,0.25)] scale-[1.01]' : 'hover:border-gray-600'} `}
                >

                    {/* Center message */}
                    {!droppable.isOver && elements.length === 0 && (
                        <p className="absolute z-20  flex items-center justify-center text-gray-500 font-semibold tracking-wide">
                            Drop your form elements here
                        </p>
                    )}

                    {/* Drop highlight area */}
                    {droppable.isOver && elements.length === 0 && (
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



export default Designer
