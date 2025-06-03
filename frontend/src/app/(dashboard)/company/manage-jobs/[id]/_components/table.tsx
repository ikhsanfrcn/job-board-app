import { IApplication, ITestResult } from "@/types/applicationType";
import Image from "next/image";
import { BiPlus } from "react-icons/bi";

interface IProps {
  applicants: IApplication[];
  setPreviewUrl: (url: string | null) => void;
  onUpdateStatus: (id: string, status: string) => void;
  onViewTestResult?: (testResult: ITestResult, userFullName: string) => void;
}
export default function Table({
  applicants,
  setPreviewUrl,
  onUpdateStatus,
  onViewTestResult
}: IProps) {
   const handleTestResultClick = (app: IApplication) => {
    const testData = app.user.userTest?.[0];
    if (testData && onViewTestResult) {
      const fullName = `${app.user.firstName || ''} ${app.user.lastName || ''}`.trim();
      onViewTestResult(testData, fullName);
    }
  };

  const hasTestResult = (app: IApplication): boolean => {
    return !!(app.user.userTest && app.user.userTest.length > 0);
  };

  return (
    <table className="w-full text-sm text-left border-collapse">
      <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
        <tr>
          <th className="p-3 border-b">Photo</th>
          <th className="p-3 border-b">Name</th>
          <th className="p-3 border-b">Education</th>
          <th className="p-3 border-b">Expected Salary</th>
          <th className="p-3 border-b">Applied At</th>
          <th className="p-3 border-b">CV</th>
          <th className="p-3 border-b">Test</th>
          <th className="p-3 border-b">Status</th>
          <th className="p-3 border-b">Action</th>
        </tr>
      </thead>
      <tbody>
        {applicants.map((app) => (
          <tr
            key={app.id}
            className="hover:bg-gray-50 transition-colors duration-150"
          >
            <td className="p-3 border-b">
              <Image
                src={app.user.avatar}
                width={40}
                height={40}
                alt={app.user.firstName || "applicant-photo"}
                className="w-10 h-10 rounded-full object-cover border"
              />
            </td>
            <td className="p-3 border-b font-medium text-gray-800">
              {app.user.firstName}
            </td>
            <td className="p-3 border-b text-gray-600">{app.user.education}</td>
            <td className="p-3 border-b text-gray-600">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(Number(app.expectedSalary))}
            </td>
            <td className="p-3 border-b text-gray-600">
              {new Intl.DateTimeFormat("id-ID", {
                timeZone: "Asia/Jakarta",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(app.createdAt))}
            </td>
            <td className="p-3 border-b">
              {app.cvUrl ? (
                <button
                  onClick={() => setPreviewUrl(app.cvUrl)}
                  className="text-green-600 hover:underline hover:text-green-800 transition"
                >
                  View CV
                </button>
              ) : (
                <span className="text-gray-400 italic">No CV</span>
              )}
            </td>
            <td className="p-3 border-b">
              {hasTestResult(app) ? (
                <button
                  onClick={() => handleTestResultClick(app)}
                  className="text-sky-500 hover:underline hover:text-sky-700 transition"
                >
                  View Result
                </button>
              ) : (
                <span className="text-gray-400 italic">No Test</span>
              )}
            </td>
            <td className="p-3 border-b capitalize text-gray-700">
              {app.status}
            </td>
            <td className="p-3 border-b">
              {["PENDING", "VIEWED"].includes(app.status) && (
                <button
                  onClick={() => onUpdateStatus(app.id, "SHORTLISTED")}
                  className="flex items-center gap-2 mx-auto bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow transition duration-200"
                >
                  <BiPlus className="w-4 h-4" />
                  Shortlist
                </button>
              )}

              {app.status === "SHORTLISTED" && (
                <button
                  onClick={() => onUpdateStatus(app.id, "INTERVIEW")}
                  className="flex items-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow transition duration-200"
                >
                  <BiPlus className="w-4 h-4" />
                  Interview
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
