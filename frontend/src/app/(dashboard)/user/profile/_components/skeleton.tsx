export default function Skeleton() {
  return (
    <div className="w-full h-full px-8 md:px-24">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <div className="p-6">
            <div className="flex items-center mb-2 space-x-2">
              {/* Skeleton title */}
              <div className="h-8 w-48 bg-gray-300 rounded animate-pulse"></div>
              {/* Skeleton edit icon placeholder */}
              <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
            {/* Skeleton subtitle */}
            <div className="h-4 w-64 bg-gray-300 rounded mb-6 animate-pulse"></div>

            {/* Skeleton content placeholders */}
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 bg-gray-300 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
