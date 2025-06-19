"use client";

import { useState, useEffect, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit: number;
  passingScore: number;
  totalPoints: number;
}

interface Score {
  score: number;
  correct: number;
  total: number;
  isPassed: boolean;
}

export default function Page({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = use(params);
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.accessToken;

  // State with proper typing
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(1800);
  const [completed, setCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<Score | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load previous state
  useEffect(() => {
    const storedEndTime = localStorage.getItem("assessmentEndTime");

    if (storedEndTime) {
      const remainingTime = Math.max(
        Math.floor((parseInt(storedEndTime, 10) - Date.now()) / 1000),
        0
      );
      setTimeLeft(remainingTime);
    } else {
      const newEndTime = Date.now() + timeLeft * 1000;
      localStorage.setItem("assessmentEndTime", newEndTime.toString());
    }

    const savedQuestionIndex = localStorage.getItem("assessmentCurrentIndex");

    if (savedQuestionIndex) setCurrentIndex(parseInt(savedQuestionIndex, 10));
  }, []);

  useEffect(() => {
    const initializeAssessment = async () => {
      try {
        const { data: template } = await axios.get<Assessment>(
          `/assessment/${templateId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAssessment(template);

        const { data: session } = await axios.post<{
          sessionToken: string;
          answers: Record<number, string>;
          currentQuestionIndex: number;
          timeRemaining: number;
        }>(
          `/assessment/start/${templateId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSessionToken(session.sessionToken);
        setAnswers(session.answers || {});
        setCurrentIndex(session.currentQuestionIndex || currentIndex);
        setTimeLeft(session.timeRemaining || timeLeft);
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) initializeAssessment();
  }, [templateId, session, router]);

  const saveProgress = useCallback(async () => {
    if (!sessionToken) return;
    const savedIndex = currentIndex + 1;

    try {
      await axios.put(
        "/assessment/progress",
        {
          sessionToken,
          answers,
          currentQuestionIndex: savedIndex,
          timeRemaining: timeLeft,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.setItem("assessmentTimeLeft", timeLeft.toString());
      localStorage.setItem("assessmentCurrentIndex", savedIndex.toString());
    } catch (error) {
      console.error("Progress save failed:", error);
    }
  }, [sessionToken, answers, currentIndex, timeLeft, token]);

  const handleAnswer = async (option: string) => {
    const newAnswers = { ...answers, [currentIndex]: option };
    setAnswers(newAnswers);

    localStorage.setItem("assessmentCurrentIndex", currentIndex.toString());
    localStorage.setItem("assessmentTimeLeft", timeLeft.toString());

    await saveProgress();
  };

  const submitAssessment = async () => {
    if (!sessionToken || !assessment) return;

    try {
      const { data: result } = await axios.post(
        "/assessment/submit",
        {
          sessionToken,
          answers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setScore({
        score: result.score,
        correct: result.correctAnswers,
        total: result.totalQuestions,
        isPassed: result.isPassed,
      });
      setCompleted(true);

      localStorage.removeItem("assessmentCurrentIndex");
      localStorage.removeItem("assessmentEndTime");
      localStorage.removeItem("assessmentTimeLeft");
    } catch (error) {
      console.log(error);
    }
  };

  // Timer with auto-submit
  useEffect(() => {
    if (completed || !assessment) return;

    localStorage.setItem("assessmentCurrentIndex", currentIndex.toString());
    const timer = setInterval(() => {
      const storedEndTime = localStorage.getItem("assessmentEndTime");
      const remainingTime = Math.max(
        Math.floor((parseInt(storedEndTime || "0", 10) - Date.now()) / 1000),
        0
      );

      setTimeLeft(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timer);
        submitAssessment();
      }
    });

    return () => clearInterval(timer);
  }, [completed, assessment, currentIndex]);

  if (loading)
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-3xl">
        Loading assessment...
      </div>
    );
  if (!assessment)
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-3xl">
        Assessment not found!
      </div>
    );
  if (completed && score) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center font-sans">
        <div className="flex flex-col items-center justify-center p-12 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-5">
            Skill Assessment Completed
          </h2>
          <div className="text-lg">
            ({score.correct}/{score.total} correct)
          </div>
          <div className="text-xl my-3">
            {score.isPassed ? (
              <span className="text-green-600">{score.score} points</span>
            ) : (
              <span className="text-red-500">{score.score} points</span>
            )}
          </div>
          <div>
            {score.isPassed ? (
              <p className="text-green-600">Congratulations! You passed!</p>
            ) : (
              <p className="text-red-500">Try again to improve your score</p>
            )}
          </div>
          <button
            onClick={() => router.push("/user/subscribe/skill-assessment")}
            className="mt-5 bg-white border px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 hover:text-white cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = assessment.questions[currentIndex];

  return (
    <div className="w-[80%] mx-auto p-6 bg-white rounded-xl my-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-xl font-semibold">{assessment?.title}</h2>
        <div className="text-right">
          <div className="text-red-500">
            Time: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
          </div>
          <div className="text-xs text-gray-500">
            {currentIndex + 1} of {assessment?.questions.length}
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-6">{assessment?.description}</p>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {currentIndex + 1}. {currentQuestion?.question}
        </h3>
        <div className="space-y-2">
          {currentQuestion?.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(option)}
              className={`w-full px-4 py-2 rounded-md text-left transition border ${
                answers[currentIndex] === option
                  ? "bg-green-100 border-green-500 text-green-700"
                  : "bg-gray-100 hover:bg-sky-100 border-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="text-center">
        <button
          onClick={() => {
            if (currentIndex < assessment.questions.length - 1) {
              const newIndex = currentIndex + 1;
              setCurrentIndex(newIndex);

              localStorage.setItem(
                "assessmentCurrentIndex",
                newIndex.toString()
              ); // Save immediately
              saveProgress();
            } else {
              submitAssessment();
            }
          }}
          className="px-10 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          {currentIndex < assessment.questions.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
      <div className="text-xs italic mt-10">
        Note:
        <br /> This test is consist of 25 questions. Total time to finish is 30 minutes.
        <br />
        You can only move to the next the question, cannot go back to the previous question.
      </div>
    </div>
  );
}
