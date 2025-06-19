export default function Sugestion() {
  return (
    <div className="w-full pl-14">
      <div className="w-full border border-gray-200 rounded-xl p-4">
        <h4 className="text-lg font-semibold mb-3">Jobs You May Like</h4>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
            <p className="text-sm">Company Name</p>
          </div>
          <p className="font-semibold">Job Title</p>
          <p className="text-sm">Location</p>
        </div>
      </div>
    </div>
  );
}
