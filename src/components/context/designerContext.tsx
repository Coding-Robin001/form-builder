"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { FormElementInstance } from '../formElements'

type DesignerContextType = {
    elements: FormElementInstance[],
    addElement: (index: number, element: FormElementInstance) => void
    removeElement: (ElementId: string) => void

    selectedElement: FormElementInstance | null
    setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>
}

export const DesignerContext = createContext<DesignerContextType | null>(null)

export default function DesignerContextProvider({ children }: { children: ReactNode }) {

    const [elements, setElements] = useState<FormElementInstance[]>([])
    const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null)

    const addElement = (index: number, element: FormElementInstance) => {
        setElements((prev) => {
            const newElements = [...prev]
            newElements.splice(index, 0, element)
            return newElements
        })
    }

    const removeElement = (elementId: string) => {
        setElements((prev) => prev.filter((element) => element.id !== elementId))
    }

    return (
        <DesignerContext.Provider
            value={{ elements, addElement, removeElement, selectedElement, setSelectedElement }}
        >
            {children}
        </DesignerContext.Provider>
    )
}