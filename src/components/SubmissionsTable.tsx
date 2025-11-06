import { getFormsWithSubmissions } from '@/actions/form'
import { ElementsType, FormElementInstance } from './formElements'
import { formatDistance } from 'date-fns'
import { ReactNode } from 'react'

export default async function SubmissionsTable({ id }: { id: number }) {

    type Row = { [key: string]: string } & { submittedAt: Date }

    const form = await getFormsWithSubmissions(id)

    if (!form) {
        throw new Error("form not found!")
    }

    const formElement = JSON.parse(form.content ?? "[]") as FormElementInstance[]

    const columns = formElement
        .filter(el => el.type === "TextField")
        .map(el => ({
            id: el.id,
            label: el.extraAttributes?.label ?? "Untitled Field",
            required: el.extraAttributes?.required ?? false,
            type: el.type as ElementsType,
        }))

    const rows: Row[] = []
    form.formSubmissions.forEach(submission => {
        const content = JSON.parse(submission.content ?? "{}")
        rows.push({
            ...content,
            submittedAt: submission.createdAt,
        })
    })

    if (rows.length === 0) {
        return (
            <>
                <h2 className="text-2xl font-bold mb-6 text-emerald-300">Submissions</h2>
                <div className="text-gray-400 text-sm border border-gray-800 rounded-xl bg-gray-900/40 p-6 text-center">
                    No submissions yet.
                </div>
            </>
        )
    }

    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-emerald-300">Submissions</h2>

            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/50">
                <table className="min-w-full text-sm text-gray-300">
                    <thead className="bg-gray-800/70 text-gray-400 uppercase text-xs tracking-wider">
                        <tr>
                            {columns.map(col => (
                                <th
                                    key={col.id}
                                    className="px-4 py-3 text-left font-semibold border-b border-gray-700"
                                >
                                    {col.label}
                                    {col.required && <span className="text-red-500 ml-1">*</span>}
                                </th>
                            ))}
                            <th className="px-4 py-3 text-right font-semibold border-b border-gray-700">
                                Submitted At
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) => (
                            <tr
                                key={i}
                                className="hover:bg-gray-800/50 transition-colors duration-200 border-b border-gray-800/60"
                            >
                                {columns.map(col => (
                                    <RowCell
                                        key={col.id}
                                        type={col.type}
                                        value={row[col.id]}
                                    />
                                ))}
                                <td className="px-4 py-3 text-right text-gray-400 text-xs">
                                    {formatDistance(new Date(row.submittedAt), new Date(), { addSuffix: true })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}


function RowCell({ type, value }: { type: ElementsType; value: string }) {
    let node: ReactNode = value
    return <td className='px-4 py-3 truncate'>{node}</td>
}