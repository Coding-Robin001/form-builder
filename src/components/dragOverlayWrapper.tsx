import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { SideBarBtnElementDragOverlay } from './sideBarBtnElement'
import { ElementsType, FormElements } from './formElements'

function DragOverlayWrapper() {
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
    return (
        <DragOverlay>{node}</DragOverlay>
    )
}

export default DragOverlayWrapper
