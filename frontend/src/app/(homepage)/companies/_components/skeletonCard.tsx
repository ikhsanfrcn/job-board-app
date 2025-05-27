export default function CompanyCardSkeleton() {
  return (
    <div className="w-full p-4 rounded-lg bg-white hover:bg-gray-100 mb-5 animate-pulse">
      <div className="flex items-center space-x-4 mb-2">
        <div className="w-16 h-16 flex-shrink-0 rounded-md bg-gray-300" />
        <div className="flex-1 space-y-2">
          <div className="w-1/2 h-4 bg-gray-300 rounded" />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-4 bg-gray-300 rounded" />
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 text-sm mb-2">
        <div className="w-24 h-3 bg-gray-300 rounded" />
        <div className="h-1 w-1 bg-gray-300 rounded-full" />
        <div className="w-16 h-3 bg-gray-300 rounded" />
      </div>

      <div className="space-y-2 mb-2">
        <div className="h-3 w-full bg-gray-300 rounded" />
        <div className="h-3 w-3/4 bg-gray-300 rounded" />
      </div>

      <div className="flex items-center space-x-4 text-sm">
        <div className="w-20 h-3 bg-gray-300 rounded" />
        <div className="w-24 h-3 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
