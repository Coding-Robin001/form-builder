import React from "react";
import { getForms } from "@/app/actions/form";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Eye, Pencil } from "lucide-react"; // clean icons

// Define your Form type based on your schema
interface Form {
    id: number;
    name: string;
    description?: string | null;
    status?: "Draft" | "Published" | string;
    createdAt: Date | string;
    published: boolean;
    submissions: number;
    visits: number;
}

// Parent component — async (fetches forms)
export const FormCards = async () => {
    const forms = await getForms();

    return (
        <>
            {
                forms.map((form) => (
                    <FormCard key={form.id} form={form} />
                ))
            }
        </>
    );
};

// Single Form Card component
export const FormCard = ({ form }: { form: Form }) => {
    const isPublished = form.published;

    return (
        <div
            key={form.id}
            className="relative w-full h-66 bg-[#111827] border border-gray-800 rounded-xl p-4 text-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
        >
            {/* Badge */}
            <span
                className={`absolute top-3 right-3 text-xs font-semibold px-6 py-[6px] rounded-md ${isPublished ? "bg-green-600" : "bg-red-600"
                    }`}
            >
                {isPublished ? "Published" : "Draft"}
            </span>

            {/* Content */}
            <div className="flex flex-col gap-2">
                {/* Header */}
                <h3 className="text-base text-[1.5rem] font-semibold truncate">{form.name}</h3>

                {/* Time */}
                <p className="text-md text-gray-400">
                    {formatDistanceToNow(new Date(form.createdAt), { addSuffix: true })}
                </p>

                {/* Description */}
                <p className="text-[1.2rem] text-gray-300 line-clamp-2">
                    {form.description || "No description"}
                </p>
            </div>


            {/* Button */}
            {
                form.published ? (
                    <Link href={`/forms/${form.id}`} className="w-full">
                        <button
                            className="w-full border cursor-pointer border-gray-700 bg-gray-800 rounded-lg py-2 text-md font-medium flex items-center justify-center gap-2 hover:bg-blue-600 hover:border-blue-600 transition"
                        >
                            <Eye className="w-4 h-4" />
                            View submissions
                        </button>
                    </Link>
                ) : (
                    <Link href={`/builder/${form.id}`} className="w-full">
                        <button
                            className="w-full border cursor-pointer border-gray-700 bg-gray-800 rounded-lg py-2 text-md font-medium flex items-center justify-center gap-2 hover:bg-blue-600 hover:border-blue-600 transition"
                        >
                            <Pencil className="w-4 h-4" />
                            Edit form
                        </button>
                    </Link>
                )
            }




        </div>
    );
};


