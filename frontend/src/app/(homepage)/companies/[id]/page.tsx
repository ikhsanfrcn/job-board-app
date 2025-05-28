import Detail from "./_components/detail";
import Sidebar from "./_components/sidebar";
import Sugestion from "./_components/sugestion";
export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <div className="w-full lg:px-32">
      <div className="w-full flex flex-wrap">
        <div className="hidden lg:block lg:w-3/12">
          <Sidebar />
        </div>
        <div className="w-full lg:w-6/12">
          <Detail id={id} />
        </div>
        <div className="hidden lg:block lg:w-3/12">
        <Sugestion/>
        </div>
      </div>
    </div>
  );
}
