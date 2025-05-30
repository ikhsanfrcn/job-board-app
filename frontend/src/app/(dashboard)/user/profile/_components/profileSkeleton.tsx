export default function ProfileSkeleton() {
  const fields = Array(11).fill(null);

  return (
    <div className="w-full animate-pulse">
      <div className="p-6">
        <div className="flex items-center mb-2 space-x-2">
          <div className="h-6 w-40 bg-gray-300 rounded" />
          <div className="h-8 w-8 bg-gray-300 rounded-full" />
        </div>

        <div className="h-4 w-80 bg-gray-200 rounded mb-6" />

        <div className="space-y-4 text-sm text-gray-800">
          {fields.map((_, index) => (
            <div key={index}>
              <div className="h-3 w-24 bg-gray-300 rounded mb-1" />
              <div className="h-4 w-full bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
