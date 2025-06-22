export default function SkeletonApplicant({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-3 border-b">Photo</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Education</th>
              <th className="p-3 border-b">Expected Salary</th>
              <th className="p-3 border-b">Applied At</th>
              <th className="p-3 border-b">CV</th>
              <th className="p-3 border-b">Test</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="p-3 border-b">
                  <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                </td>

                <td className="p-3 border-b">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                </td>

                <td className="p-3 border-b">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                </td>

                <td className="p-3 border-b">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                </td>

                <td className="p-3 border-b">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-36"></div>
                </td>

                <td className="p-3 border-b">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                </td>

                <td className="p-3 border-b">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                </td>

                <td className="p-3 border-b">
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
                </td>

                <td className="p-3 border-b">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
