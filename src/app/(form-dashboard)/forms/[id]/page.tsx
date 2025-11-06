
import { Share2, FileText, BarChart2, Percent, TrendingDown } from "lucide-react";
import { getFormByid } from "@/actions/form";
import VisitBtn from "@/components/visitBtn";
import ShareLinkBox from "@/components/sharelink";
import StatCard from "@/components/statCard";
import SubmissionsTable from "@/components/SubmissionsTable";


const FormDetailsPage = async ({ params }: { params: { id: string } }) => {

    const { id } = await params
    const trimmedId = Number(id?.trim());

    const form = await getFormByid(trimmedId)

    if (!form) {
        throw new Error("form not found!")
    }

    // ✅ Derive stats locally instead of refetching
    const { visits, submissions } = form;
    const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
    const bounceRate = visits > 0 ? 100 - submissionRate : 0;

    const stats = {
        visits,
        submissions,
        submissionRate,
        bounceRate,
    };

    const statsConfig = [
        {
            key: "visits",
            title: "Total Visits",
            description: "All time form visits",
            color: "border-blue-500",
            icon: <BarChart2 className="w-6 h-6 text-emerald-400" />,
            format: (val: number) => val.toLocaleString(),
        },
        {
            key: "submissions",
            title: "Total Submissions",
            description: "All time form submissions",
            color: "border-orange-400",
            icon: <FileText className="w-6 h-6 text-orange-400" />,
            format: (val: number) => val.toLocaleString(),
        },
        {
            key: "submissionRate",
            title: "Submission Rate",
            description: "Visits that result in form submission",
            color: "border-emerald-400",
            icon: <Percent className="w-6 h-6 text-emerald-400" />,
            format: (val: number) => `${val.toFixed(1)}%`,
        },
        {
            key: "bounceRate",
            title: "Bounce Rate",
            description: "Visits that leave without interacting",
            color: "border-red-500",
            icon: <TrendingDown className="w-6 h-6 text-red-400" />,
            format: (val: number) => `${val.toFixed(1)}%`,
        },
    ] as const;


    return (
        <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white p-8">
            {/* Header */}
            <header className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white">
                        {form.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        Analytics overview & submission stats for your form
                    </p>
                </div>

                <div className="flex gap-3">
                    <VisitBtn shareUrl={form.shareURL} />
                    <button className="px-4 py-2 border border-gray-700 bg-gray-800 hover:border-emerald-500 hover:text-emerald-400 rounded-lg flex items-center gap-2 transition">
                        <Share2 className="w-4 h-4" />
                        Share Link
                    </button>
                </div>
            </header>

            {/* Link Box */}
            <ShareLinkBox shareUrl={form.shareURL} />

            {/* Stats Section */}
            <section className="max-w-7xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsConfig.map((item) => (
                    <StatCard
                        key={item.key}
                        title={item.title}
                        description={item.description}
                        color={item.color}
                        icon={item.icon}
                        value={stats[item.key]}
                        format={item.format}
                    />
                ))}
            </section>

            <hr className="my-14 border-t border-gray-800 opacity-80 max-w-7xl mx-auto" />

            {/* Submissions Section */}
            <section className="max-w-7xl mx-auto">
                <SubmissionsTable id={form.id} />
            </section>
        </div>
    )
}


export default FormDetailsPage

