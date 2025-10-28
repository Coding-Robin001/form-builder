import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { SideBarBtnElementDragOverlay } from './sideBarBtnElement'
import { ElementsType, FormElements } from './formElements'
import UseDesigner from './hooks/useDesigner'

function DragOverlayWrapper() {

    const { elements } = UseDesigner()
    const [draggedItem, setDraggedItem] = useState<Active | null>(null)

    useDndMonitor({
        onDragStart: (event) => {
            console.log("drag item", event)
            setDraggedItem(event.active)
        },
        onDragCancel: () => {
            setDraggedItem(null)
        },
        onDragEnd: () => {
            setDraggedItem(null)
        }
    })

    if (!draggedItem) return null

    let node = <div className='text-[red]'>no drag overlay</div>
    const isSideBarElement = draggedItem?.data?.current?.isDesignerBtnElement

    if (isSideBarElement) {
        const type = draggedItem?.data?.current?.type as ElementsType
        node = <SideBarBtnElementDragOverlay formElement={FormElements[type]} />
    }

    const isDesignerElement = draggedItem?.data?.current?.isDesignerElement
    if (isDesignerElement) {
        const elementId = draggedItem?.data?.current?.elementId
        const element = elements.find((el) => el.id === elementId)

        if (!element) node = <div>element not found!</div>
        else {
            const DesignerElementComponent = FormElements[element.type].designerComponent

            node =
                <div className="bg-[rgba(239,68,68,0.25)] rounded-md backdrop-blur-sm pointer-events-none">
                    <DesignerElementComponent elementInstance={element} />
                </div>
        }
    }


    return (
        <DragOverlay>{node}</DragOverlay>
    )
}

export default DragOverlayWrapper
