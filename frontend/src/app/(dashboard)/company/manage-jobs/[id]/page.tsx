import Hero from "@/app/(dashboard)/_components/hero";
import Applicants from "./_components/applicants";

export default async function ApplicantsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div className="w-full md:px-14">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <Hero title="Applicants" />
        <Applicants jobId={id} />
      </div>
    </div>
  );
}
