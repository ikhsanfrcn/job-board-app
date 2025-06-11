import axios from "@/lib/axios";
import { IUserAssessment } from "@/types/assessment";
import { AxiosError } from "axios";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface IProps {
  assessments: IUserAssessment[];
}

export default function Card({ assessments }: IProps) {
  const { data: user } = useSession();
  const token = user?.accessToken;

  const handleDownloadPdf = async (assessmentId: string, token?: string) => {
    if (!token) {
      toast.error("You must be logged in to download the certificate.");
      return;
    }

    try {
      const { data } = await axios.get(
        `/assessment/generate-pdf/${assessmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificate.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.message || "Failed to download certificate."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {assessments.map((item) => {
          const duration = Math.round(item.timeSpent / 60);
          const completedAgo = formatDistanceToNow(new Date(item.completedAt), {
            addSuffix: true,
          });

          return (
            <div
              key={item.id}
              className={`border-l-4 rounded-lg shadow-md p-4 bg-white ${
                item.isPassed ? "border-green-500" : "border-red-500"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-primary">
                  {item.template.title}
                </h3>
                <span
                  className={`text-sm font-medium px-2 py-0.5 rounded ${
                    item.isPassed
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.isPassed ? "Passed" : "Failed"}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                Category:{" "}
                <span className="font-medium">{item.template.category}</span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Score:{" "}
                <span className="font-semibold">
                  {item.score}/{item.totalPoints} (
                  {Math.round((item.score / item.totalPoints) * 100)}%)
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Time spent: <span className="italic">{duration} minutes</span>
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Completed {completedAgo}
              </p>

              {item.isPassed && (
                <button
                  onClick={() => handleDownloadPdf(item.id, token)}
                  className="mt-4 text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded shadow"
                >
                  Download Certificate
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
