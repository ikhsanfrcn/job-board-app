import CreateReview from "./_components/createReview";
import SideBar from "./_components/sideBar";

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const companyId = (await params).id;

  return (
    <div>
      <div className="w-full lg:px-32 p-4">
        <div className="w-full flex flex-wrap">
          <div className="w-full md:w-8/12">
            <CreateReview companyId={companyId} />
          </div>
          <div className="w-full md:w-4/12">
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
