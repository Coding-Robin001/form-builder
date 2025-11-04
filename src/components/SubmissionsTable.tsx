import React from 'react'

export default function SubmissionsTable({ id }: { id: number }) {
    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-emerald-300">Submissions</h2>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
                <div className="grid grid-cols-2 sm:grid-cols-3 text-gray-400 text-sm font-medium bg-gray-800/60 px-4 py-2 border-b border-gray-700">
                    <span>TEXT FIELD</span>
                    <span className="hidden sm:block">VALUE</span>
                    <span className="text-right">SUBMITTED AT</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 px-4 py-3 text-gray-300 hover:bg-gray-800/50 transition">
                    <span>Text submit</span>
                    <span className="hidden sm:block truncate">Sample value here</span>
                    <span className="text-right text-gray-400 text-sm">about 14 hours ago</span>
                </div>
            </div>
        </>
    )
}
