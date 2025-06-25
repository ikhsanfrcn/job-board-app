export default function SkeletonReview() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white animate-pulse"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div>
              <div className="h-3 w-28 bg-gray-200 rounded mb-1" />
              <div className="h-2 w-36 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="mb-3">
            <div className="h-3 w-20 bg-gray-200 rounded mb-1" />
            <div className="h-3 w-full bg-gray-200 rounded" />
          </div>

          <div>
            <div className="h-3 w-20 bg-gray-200 rounded mb-1" />
            <div className="h-3 w-full bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
