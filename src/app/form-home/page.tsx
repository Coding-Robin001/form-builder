
import { PlusCircle, BarChart2, FileText, Percent, TrendingDown } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Visits",
      value: 0,
      description: "All time form visits",
      color: "border-blue-500",
      icon: <BarChart2 className="w-6 h-6 text-emerald-400" />,
    },
    {
      title: "Total Submissions",
      value: 0,
      description: "All time form submissions",
      color: "border-orange-400",
      icon: <FileText className="w-6 h-6 text-orange-400" />,
    },
    {
      title: "Submission Rate",
      value: "0%",
      description: "Visits that result in form submission",
      color: "border-emerald-400",
      icon: <Percent className="w-6 h-6 text-emerald-400" />,
    },
    {
      title: "Bounce Rate",
      value: "0%",
      description: "Visits that leave without interacting",
      color: "border-red-500",
      icon: <TrendingDown className="w-6 h-6 text-red-400" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-md p-8">

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-12">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r from-black via-gray-900 to-black border-l-4 border-b-2 border-r-4 border-t-1 ${item.color} rounded-2xl p-6 shadow hover:shadow-emerald-600/20 hover:scale-[1.02] transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-300">{item.title}</h2>
              {item.icon}
            </div>
            <p className="text-3xl font-bold text-white">{item.value}</p>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Forms Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-emerald-300">Your Forms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div 
          className="border-2 border-dashed border-white-700 hover:border-orange-400 transition rounded-2xl flex flex-col items-center justify-center h-56 cursor-pointer bg-gradient-to-r from-black via-gray-900 to-black hover:bg-[#17231c] shadow-md hover:shadow-lg hover:shadow-orange-500/20">
            <PlusCircle className="w-12 h-12 text-orange-400 mb-3" />
            <p className="text-lg font-semibold text-gray-300">Create New Form</p>
          </div>
        </div>
      </section>
    </div>
  );
}

