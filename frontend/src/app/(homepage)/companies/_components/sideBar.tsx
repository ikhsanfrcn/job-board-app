export default function SideBar() {
  return (
    <div className="w-full p-4 pr-14">
      <h2 className="text-2xl text-gray-800 font-semibold mb-5">
        Explore Companies
      </h2>
      <h2 className="text-xl text-gray-800 font-semibold">Filter Companies</h2>
      <p className="text-sm text-gray-600 mb-5">1-10 of 9,990 results</p>
      <form>
        <div className="mb-4">
          <label className="text-sm text-gray-600">Company</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-200 bg-gray-100 rounded-full"
            placeholder="Select a commpany"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-600">Location</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-200 bg-gray-100 rounded-full"
            placeholder="Select a location"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-600">Industries</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-200 bg-gray-100 rounded-full"
            placeholder="E.g. healthcare, internet, eduaction"
          />
        </div>
      </form>
    </div>
  );
}
