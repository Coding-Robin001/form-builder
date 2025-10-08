"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

function themeSwitcher() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return <div>theme switcher</div>
}

export default themeSwitcher
