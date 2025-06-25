import Hero from "../../_components/hero";
import Assessments from "./_components/assessments";

export default function assessmentsPage() {
  return (
    <div className="w-full md:px-14">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <Hero title="Assessment History" />
        <Assessments />
      </div>
    </div>
  );
}
