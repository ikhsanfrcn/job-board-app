import { ITestResult } from "@/types/applicationType";
import { BiX } from "react-icons/bi";

interface TestResultModalProps {
  testResult: ITestResult;
  userFullName: string;
  onClose: () => void;
}

export default function TestResultModal({
  testResult,
  userFullName,
  onClose,
}: TestResultModalProps) {
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100";
    if (percentage >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          title="Close"
        >
          <BiX className="text-2xl" />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Test Result for {userFullName}
          </h2>
          <hr className="mb-2 text-gray-300"/>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Score:</span>
              <span className="text-lg font-medium text-gray-800">
                {testResult.correctAnswers} / {testResult.totalQuestions}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Percentage:</span>
              <div
                className={`px-3 py-1 rounded-full ${getScoreBgColor(
                  testResult.scorePercentage
                )}`}
              >
                <span
                  className={`font-semibold ${getScoreColor(
                    testResult.scorePercentage
                  )}`}
                >
                  {testResult.scorePercentage.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completed:</span>
              <span className="text-sm text-gray-600">
                {new Intl.DateTimeFormat("id-ID", {
                  timeZone: "Asia/Jakarta",
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(testResult.completedAt))}
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
