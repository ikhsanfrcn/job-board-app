import { useState } from "react";
import { IUserAssessment } from "@/types/assessment";
import { formatDistanceToNow } from "date-fns";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface IProps {
  assessments: IUserAssessment[];
  handleDownloadPdf: (assessmentId: string) => Promise<void>;
  isSubscribe?: boolean;
}

export default function AssessmentsCard({
  assessments,
  handleDownloadPdf,
  isSubscribe,
}: IProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (id: string) => {
    if (downloadingId) return;
    setDownloadingId(id);
    try {
      await handleDownloadPdf(id);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="w-full">
      {assessments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No Assessments Found
          </h3>
          <p className="text-sm text-gray-500 max-w-sm">
            We couldn’t find any assessments based on your current filters or
            data. Try adjusting your filters or take a new assessment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {assessments.map((item) => {
            const duration = Math.round(item.timeSpent / 60);
            const completedAgo = formatDistanceToNow(
              new Date(item.completedAt),
              {
                addSuffix: true,
              }
            );

            const isDownloading = downloadingId === item.id;

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
                  <>
                    <button
                      data-tooltip-id={
                        !isSubscribe ? "download-tooltip" : undefined
                      }
                      data-tooltip-content="You must subscribe to download the certificate"
                      onClick={() => {
                        if (isSubscribe && !isDownloading) {
                          handleDownload(item.id);
                        }
                      }}
                      disabled={!isSubscribe || isDownloading}
                      className={`mt-4 text-sm px-3 py-1.5 rounded shadow transition ${
                        isSubscribe
                          ? isDownloading
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      {isDownloading
                        ? "Downloading..."
                        : "Download Certificate"}
                    </button>

                    {!isSubscribe && (
                      <Tooltip
                        id="download-tooltip"
                        place="bottom"
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          fontSize: "0.75rem",
                          borderRadius: "6px",
                          padding: "6px 10px",
                        }}
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
