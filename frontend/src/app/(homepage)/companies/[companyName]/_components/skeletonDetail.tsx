export default function SkeletonDetail() {
  return (
    <div className="w-full border border-gray-200 rounded-xl animate-pulse">
      <div className="w-full p-4 border-b border-gray-200">
        <div className="w-20 h-20 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3 mb-5"></div>
        <div className="flex gap-2 mb-5">
          <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
          <div className="h-8 w-32 bg-gray-300 rounded-md"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}
