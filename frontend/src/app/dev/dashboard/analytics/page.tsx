export default function Analytics() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Dashboard
          </h1>
          <nav className="text-sm text-gray-500">
            <span>🏠 / Dashboards / Analytics </span>
          </nav>
        </div>

        {/* Sample content cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">NEW ACCOUNTS</h3>
              <div className="text-2xl">📈</div>
            </div>
            <div className="text-2xl font-bold text-gray-800">234 %</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">TOTAL EXPENSES</h3>
              <div className="text-2xl">📉</div>
            </div>
            <div className="text-2xl font-bold text-gray-800">71 %</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="bg-red-500 h-2 rounded-full w-3/5"></div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">COMPANY VALUE</h3>
              <div className="text-2xl">💰</div>
            </div>
            <div className="text-2xl font-bold text-gray-800">$ 1,45M</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="bg-yellow-500 h-2 rounded-full w-4/5"></div>
            </div>
          </div>
        </div>

        {/* Sample chart area */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Traffic Sources</h3>
            <button className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg text-sm font-medium hover:bg-yellow-500 transition-colors">
              Actions
            </button>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Chart visualization would go here</span>
          </div>
        </div>
      </div>
    </div>
  );
}