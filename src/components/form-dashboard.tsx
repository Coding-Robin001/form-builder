import { Suspense } from "react";
import { BarChart2, FileText, Percent, TrendingDown } from "lucide-react";
import { getFormStats } from "../actions/form";
import StatCard from "./statCard";
import StatCardSkeleton from "./statCardSkeleton";
import CreateFormButton from "./createFormBtn";
import { FormCardSkeleton } from "@/components/formCardSkeleton";
import { FormCards } from "@/components/formCard";

export default async function Dashboard() {

  const stats = await getFormStats();

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
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-md p-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-12">
        {statsConfig.map((item) => (
          <Suspense key={item.key} fallback={<StatCardSkeleton />}>
            <StatCard
              title={item.title}
              description={item.description}
              color={item.color}
              icon={item.icon}
              value={stats?.[item.key] ?? 0}
              format={item.format}
            />
          </Suspense>
        ))}
      </div>

      <hr className="my-14 border-t border-gray-800 opacity-80" />

      {/* Forms Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-emerald-300">Your Forms</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Create Form Button (Styled to match cards) */}
          <CreateFormButton />

          {/* Form Cards */}
          <Suspense
            fallback={[1, 2, 3, 4, 5, 6].map((el) => (
              <FormCardSkeleton key={el} />
            ))}
          >
            <FormCards />
          </Suspense>
        </div>
      </section>

    </div>
  );
}
