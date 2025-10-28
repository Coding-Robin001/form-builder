import React from 'react'
import UseDesigner from './hooks/useDesigner'
import { FormElements } from './formElements'
import { Delete, DeleteIcon, LucideDelete, SidebarCloseIcon, XCircleIcon } from 'lucide-react'

export default function PropertiesFormSidebar() {

    const { selectedElement, setSelectedElement } = UseDesigner()

    if (!selectedElement) return null

    const PropertiesComponent = FormElements[selectedElement?.type].propertiesComponent

    return (
        <div className='w-full border border-blue-600'>
            <div className='flex justify-between items-center'>
                <p className='text-gray-400'>Element Properties</p>
                <button
                    onClick={() => setSelectedElement(null)}
                    className='cursor-pointer hover:text-red-500'
                >
                    <LucideDelete className='h-8 w-8' />
                </button>

            </div>
            <PropertiesComponent elementInstance={selectedElement} />
        </div>
    )
}
