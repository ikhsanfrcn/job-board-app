export default function SkeletonSugest() {
  return (
    <div className="w-full pl-14">
      <div className="w-full border border-gray-200 rounded-xl p-4">
        <h4 className="text-lg font-semibold mb-3">Jobs You May Like</h4>

        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="mb-4 p-3 rounded-lg border border-gray-100 animate-pulse"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-gray-300 rounded-lg" />
              <div className="flex flex-col gap-1">
                <div className="w-32 h-4 bg-gray-300 rounded" />
                <div className="w-20 h-3 bg-gray-200 rounded" />
              </div>
            </div>

            <div className="w-48 h-4 bg-gray-300 rounded mb-2" />

            <div className="w-40 h-3 bg-gray-200 rounded mb-2" />

            <div className="flex gap-2 flex-wrap mt-2">
              <div className="w-14 h-4 bg-gray-200 rounded-full" />
              <div className="w-16 h-4 bg-gray-200 rounded-full" />
              <div className="w-12 h-4 bg-gray-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
