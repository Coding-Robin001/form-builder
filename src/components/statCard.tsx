import { JSX } from "react";

type StatCardProps = {
  title: string;
  description: string;
  color: string;
  icon: JSX.Element;
  value: number;
  format: (val: number) => string;
};

export default function StatCard({
  title,
  description,
  color,
  icon,
  value,
  format,
}: StatCardProps) {
  const formatted = format(value);

  return (
    <div
      className={`bg-gradient-to-r from-black via-gray-900 to-black border-l-4 border-b-2 border-r-4 border-t-1 ${color} rounded-2xl p-6 shadow hover:shadow-emerald-600/20 hover:scale-[1.02] transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-300">{title}</h2>
        {icon}
      </div>
      <p className="text-3xl font-bold text-white">{formatted}</p>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
}
