export default function ResumeSkeleton() {
  return (
    <div role="status" className="animate-pulse space-y-6">
      <div>
        <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-300 rounded"></div>
      </div>

      <div>
        <div className="h-5 w-40 bg-gray-300 rounded mb-2"></div>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="mb-4 border-b border-gray-200 pb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="space-y-1">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
                <div className="h-3 w-24 bg-gray-300 rounded"></div>
              </div>
              <div className="h-3 w-20 bg-gray-300 rounded"></div>
            </div>
            <div className="h-3 w-full bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      <div>
        <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="mb-4 flex justify-between items-center">
            <div className="space-y-1">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-3 w-24 bg-gray-300 rounded"></div>
            </div>
            <div className="h-3 w-20 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      <div>
        <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
        {[...Array(1)].map((_, i) => (
          <div key={i} className="mb-4 flex justify-between items-center">
            <div className="space-y-1">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-3 w-24 bg-gray-300 rounded"></div>
            </div>
            <div className="h-3 w-20 bg-gray-300 rounded"></div>
          </div>
        ))}
        <div className="h-3 w-full bg-gray-300 rounded"></div>
      </div>

      <div>
        <div className="h-5 w-48 bg-gray-300 rounded mb-2"></div>
        {[...Array(1)].map((_, i) => (
          <div key={i} className="mb-3">
            <div className="h-4 w-32 bg-gray-300 rounded mb-1"></div>
            <div className="h-3 w-full bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
