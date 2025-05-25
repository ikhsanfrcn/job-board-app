export default function JobListSkeleton() {
  return (
    <div className="w-full p-6 space-y-4">
      <div className="flex justify-end items-center mb-4">
        <div className="h-10 w-20 bg-gray-300 rounded-lg animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse border border-gray-200 rounded-xl shadow-sm p-5 bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="h-5 w-1/2 bg-gray-300 rounded" />
              <div className="h-5 w-16 bg-gray-200 rounded-full" />
            </div>
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
            <div className="space-y-2 text-sm text-gray-500 mb-2">
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
              <div className="h-4 w-1/3 bg-gray-200 rounded" />
              <div className="h-4 w-1/4 bg-gray-200 rounded" />
              <div className="h-4 w-1/3 bg-gray-200 rounded" />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="h-5 w-12 bg-gray-200 rounded-full" />
              <div className="h-5 w-10 bg-gray-200 rounded-full" />
              <div className="h-5 w-14 bg-gray-200 rounded-full" />
            </div>
            <div className="flex gap-2 justify-end">
              <div className="h-8 w-8 bg-gray-200 rounded-full" />
              <div className="h-8 w-8 bg-gray-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
