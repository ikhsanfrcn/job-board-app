"use client";

import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";

export default function Page({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = React.use(params);
  const { data: session } = useSession();

  const [test, setTest] = useState<{
    id: string;
    jobId: string;
    title: string;
    description: string;
    parsedQuestions: { question: string; options: string[]; answer?: string }[];
  } | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0, percentage: 0 });

  useEffect(() => {
    const savedQuestionIndex = sessionStorage.getItem(`test-${jobId}-currentQuestion`);
    if (savedQuestionIndex) {
      setCurrentQuestionIndex(parseInt(savedQuestionIndex));
    }
  }, [jobId]);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const { data } = await axios.get(`/test/${jobId}`);
        const parsedQuestions =
          typeof data.questions === "string"
            ? JSON.parse(data.questions)
            : data.questions;

        setTest({
          id: data.id,
          jobId: data.jobId,
          title: data.title,
          description: data.description,
          parsedQuestions,
        });

        const savedAnswers = sessionStorage.getItem(`test-${jobId}-answers`);
        if (savedAnswers) {
          setUserAnswers(JSON.parse(savedAnswers));
        }
      } catch (err) {
        console.error("Error fetching test:", err);
        setError("Failed to load test");
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [jobId]);

  useEffect(() => {
    if (completed || !test) return;

    const startTimeKey = `test-${jobId}-question-${currentQuestionIndex}-start`;
    const savedStartTime = sessionStorage.getItem(startTimeKey);

    if (!savedStartTime) {
      const now = Date.now();
      sessionStorage.setItem(startTimeKey, now.toString());
      setTimeLeft(30);
    } else {
      const elapsed = Math.floor(
        (Date.now() - parseInt(savedStartTime)) / 1000
      );
      const remaining = Math.max(0, 30 - elapsed);
      setTimeLeft(remaining);

      if (remaining === 0) {
        handleNextAuto();
        return;
      }
    }
    const timer = setInterval(() => {
      const currentStartTime = sessionStorage.getItem(startTimeKey);
      if (currentStartTime) {
        const elapsed = Math.floor(
          (Date.now() - parseInt(currentStartTime)) / 1000
        );
        const remaining = Math.max(0, 30 - elapsed);
        setTimeLeft(remaining);

        if (remaining === 0) {
          handleNextAuto();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, jobId, completed, test]);

  const handleOptionSelect = (index: number, option: string) => {
    const updatedAnswers = { ...userAnswers, [index]: option };
    setUserAnswers(updatedAnswers);
    
    sessionStorage.setItem(`test-${jobId}-answers`, JSON.stringify(updatedAnswers));
  };

  const handleNext = () => {
    const currentKey = `test-${jobId}-question-${currentQuestionIndex}-start`;
    sessionStorage.removeItem(currentKey);

    if (currentQuestionIndex + 1 < (test?.parsedQuestions.length || 0)) {
      const nextQuestionIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextQuestionIndex);
      
      sessionStorage.setItem(`test-${jobId}-currentQuestion`, nextQuestionIndex.toString());
    } else {
      submitTest();
    }
  };

  const handleNextAuto = () => {
    if (!userAnswers[currentQuestionIndex]) {
      const updatedAnswers = { ...userAnswers, [currentQuestionIndex]: "" };
      setUserAnswers(updatedAnswers);
      sessionStorage.setItem(`test-${jobId}-answers`, JSON.stringify(updatedAnswers));
    }
    handleNext();
  };

  const submitTest = async () => {
    if (!test) return;

    sessionStorage.removeItem(`test-${jobId}-currentQuestion`);
    sessionStorage.removeItem(`test-${jobId}-answers`);

    for (let i = 0; i < test.parsedQuestions.length; i++) {
      const key = `test-${jobId}-question-${i}-start`;
      sessionStorage.removeItem(key);
    }

    const results = test.parsedQuestions.map((q, index) => {
      const selected = userAnswers[index] || "";
      const correct = q.answer === selected;
      return { question: q.question, selected, correct };
    });

    const correctCount = results.filter((r) => r.correct).length;
    const total = results.length;
    const percentage = Math.round((correctCount / total) * 100);
    const { data } = await axios.get(
      `/users/user-email/${session?.user.email}`
    );

    await axios.post("/test/user-test", {
      userId: data.id,
      jobId: test.jobId,
      answers: Object.entries(userAnswers).map(([index, selected]) => ({
        question: test.parsedQuestions[Number(index)]?.question || "",
        selected,
      })),
    });
    
    localStorage.setItem(`test-${jobId}-completed`, "true");
    setScore({ correct: correctCount, total, percentage });
    setCompleted(true);
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading test...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (completed) {
    return (
      <div className="w-[80%] mx-auto p-6 bg-white rounded-xl font-sans my-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Test Completed</h2>
        <p className="text-lg">
          Correct Answers: {score.correct} / {score.total}
        </p>
        <p className="text-lg mt-2">Score: {score.percentage}%</p>
      </div>
    );
  }

  const question = test?.parsedQuestions[currentQuestionIndex];

  return (
    <div className="w-[80%] mx-auto p-6 bg-white rounded-xl font-sans my-10">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-xl font-semibold">{test?.title}</h2>
        <span className="text-red-500">Time left: {timeLeft}s</span>
      </div>

      <p className="text-gray-600 mb-10">{test?.description}</p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {currentQuestionIndex + 1}. {question?.question}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {question?.options.map((option, i) => {
            const isSelected = userAnswers[currentQuestionIndex] === option;
            return (
              <button
                key={i}
                onClick={() => handleOptionSelect(currentQuestionIndex, option)}
                className={`px-4 py-2 rounded-md transition border ${
                  isSelected
                    ? "bg-green-100 border-green-500 text-green-700"
                    : "bg-gray-100 hover:bg-sky-100 border-gray-300"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleNext}
          className="px-10 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition duration-200 cursor-pointer"
        >
          {currentQuestionIndex + 1 === test?.parsedQuestions.length
            ? "Submit"
            : "Next"}
        </button>
      </div>
    </div>
  );
}
