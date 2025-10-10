export default function StatCardSkeleton() {
  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-black border-l-4 border-b-2 border-r-4 border-t-1 border-gray-700 rounded-2xl p-6 shadow animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-24 bg-gray-700 rounded"></div>
        <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
      </div>
      <div className="h-8 w-20 bg-gray-700 rounded mb-2"></div>
      <div className="h-3 w-32 bg-gray-800 rounded"></div>
    </div>
  );
}
