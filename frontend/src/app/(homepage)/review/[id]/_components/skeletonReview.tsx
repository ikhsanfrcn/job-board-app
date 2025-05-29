export default function SkeletonReview() {
  const skeletonBox = "bg-gray-200 animate-pulse rounded";

  return (
    <div className="w-full p-4 space-y-4">
      <div className="h-6 w-1/3 bg-gray-200 animate-pulse rounded" />
      <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded" />

      <div className="flex items-center space-x-4">
        <div className={`w-16 h-16 ${skeletonBox}`} />
        <div className="flex-1">
          <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
          <div className="h-10 w-full bg-gray-200 animate-pulse rounded mt-2" />
        </div>
      </div>

      {[...Array(8)].map((_, i) => (
        <div key={i}>
          <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded mb-2" />
          <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
        </div>
      ))}

      <div className="w-full border border-gray-300 rounded-lg p-4 flex items-center space-x-4">
        <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full" />
        <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
      </div>

      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
      </div>

      <div className="h-10 w-32 bg-gray-300 animate-pulse rounded" />
    </div>
  );
}
