import axios from "@/lib/axios";

interface IAssessment {
  id: string;
  title: string;
  description: string;
  category: string;
}

export default async function Page() {
  const { data } = await axios.get("/assessment");
  const res: IAssessment[] = data;
  console.log(res);
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <nav className="text-sm text-gray-500">
            <span>🏠 / Dashboards / Assessment </span>
          </nav>
        </div>
        <div className="w-full flex flex-col font-sans">
          <h2 className="flex justify-center font-semibold text-xl mb-10">
            Skill Assessment
          </h2>
          {res.length > 0 ? (
            res.map((a, idx) => (
              <div
                key={a.id}
                className="mb-4 p-4 border border-gray-300 rounded flex items-center justify-between gap-3 shadow-md"
              >
                <div className="flex items-center gap-5">
                  {idx + 1}
                  <div>
                    <h3 className="text-lg font-semibold">{a.title}</h3>
                    <p className="text-gray-600">{a.description}</p>
                  </div>
                </div>
                <span className="w-20 text-xs text-gray-800 bg-green-200 p-3 rounded-lg text-center">
                  {a.category}
                </span>
              </div>
            ))
          ) : (
            <p>No Skill Assessment</p>
          )}
        </div>
      </div>
    </div>
  );
}
