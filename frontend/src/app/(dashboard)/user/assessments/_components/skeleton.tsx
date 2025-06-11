export default function AssessmentSkeleton() {
  return (
    <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="p-4 bg-white rounded-lg shadow-md border-l-4 border-gray-300 animate-pulse"
        >
          <div className="h-6 bg-gray-300 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-1"></div>
          <div className="h-4 bg-gray-100 rounded w-1/3 mt-4"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2 mt-4"></div>
        </div>
      ))}
    </div>
  );
}
