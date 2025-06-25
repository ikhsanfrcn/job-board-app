import Hero from "@/app/(dashboard)/_components/hero";
import SkillAssessment from "./_components/SkillAssessment";

export default function Page(){
  return(
    <div className="w-full md:px-14">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <Hero title="Skill Assessment" />
        <SkillAssessment />
      </div>
    </div>
  )
}