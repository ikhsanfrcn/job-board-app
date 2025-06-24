export default function SkeletonApplication({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-pulse"
        >
          <div className="flex justify-between items-start gap-2 flex-wrap sm:flex-nowrap mb-4">
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full shrink-0" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="h-6 w-[120px] bg-gray-200 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[...Array(4)].map((_, i) => (
              <div className="flex items-center space-x-2" key={i}>
                <div className="w-4 h-4 bg-gray-200 rounded-full shrink-0" />
                <div className="h-3 w-40 bg-gray-200 rounded" />
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <div className="h-8 w-24 bg-gray-200 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
