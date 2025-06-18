
export default function SkeletonJob() {
  return (
    <div className="mb-8 animate-pulse">
      <h2 className="text-xl font-semibold mb-4">Jobs</h2>

      <ul className="space-y-4 w-full">
        {Array.from({ length: 3 }).map((_, idx) => (
          <li
            key={idx}
            className="flex flex-col gap-4 p-6 border border-gray-200 rounded-2xl shadow-sm bg-white w-full"
          >
            <div className="flex justify-between items-start flex-wrap">
              <div className="h-5 w-48 bg-gray-200 rounded" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-28 bg-gray-200 rounded" />
            </div>

            <div className="flex flex-wrap gap-2 mt-1">
              <div className="h-4 w-16 bg-gray-200 rounded-full" />
              <div className="h-4 w-12 bg-gray-200 rounded-full" />
              <div className="h-4 w-20 bg-gray-200 rounded-full" />
            </div>

            <div className="h-4 w-48 bg-gray-200 rounded" />

            <div className="h-3 w-32 bg-gray-200 rounded" />
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-center gap-4 mt-6">
        <div className="h-8 w-24 bg-gray-200 rounded-lg" />
        <div className="h-4 w-20 bg-gray-200 rounded" />
        <div className="h-8 w-24 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}
