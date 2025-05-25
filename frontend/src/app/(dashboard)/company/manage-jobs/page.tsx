import Hero from "./_components/hero";
import Jobs from "./_components/jobs";

export default function JobsPage() {
  return (
    <div className="w-full md:px-14">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <Hero />
        <Jobs />
      </div>
    </div>
  );
}
