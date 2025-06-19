import Hero from "../../_components/hero";
import PastApplications from "./_components/PastApplication";

export default function Page() {
  return (
    <div className="w-full md:px-14">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <Hero title="Job Activity" />
        <PastApplications />
      </div>
    </div>
  );
}
