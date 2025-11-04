"use client"

import { useEffect, useState } from "react"

export default function VisitBtn({ shareUrl }: { shareUrl: string }) {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted){
        return null  //to avoid window not defined error
    }

    const shareLink = `${window.location.origin}/submit/${shareUrl}`

    return (
        <button
            onClick={() => window.open(shareLink, "_blank")}
            className="w-[100px] cursor-pointer px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-black font-semibold rounded-lg transition"
        >
            Visit
        </button>
    )
}
