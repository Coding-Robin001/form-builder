import React from 'react'
import { SideBarBtnElement } from './sideBarBtnElement'
import { FormElements } from './formElements'

export default function FormElementsSidebar() {
    return (
        <div className="grid grid-cols-2 gap-3">
            <SideBarBtnElement formElement={FormElements.TextField} />
            <SideBarBtnElement formElement={FormElements.TextField} />
            {/* add more as needed */}
        </div>
    )
}
