import React from 'react'
import UseDesigner from './hooks/useDesigner'
import { FormElements } from './formElements'
import { LucideDelete } from 'lucide-react'

export default function PropertiesFormSidebar() {

    const { selectedElement, setSelectedElement } = UseDesigner()

    if (!selectedElement) return null

    const PropertiesComponent = FormElements[selectedElement?.type].propertiesComponent

    return (
        <div className='w-full bg-gray-900 '>
            <div className='flex justify-between items-center pt-2 px-2'>
                <p className='text-gray-400 text-[1.1rem]'>Element Properties</p>
                <button
                    onClick={() => setSelectedElement(null)}
                    className='cursor-pointer hover:text-red-500'
                >
                    <LucideDelete className='h-8 w-8' />
                </button>

            </div>
            <hr className="mt-4 border-t border-gray-500" />
            <PropertiesComponent elementInstance={selectedElement} />
        </div>
    )
}
