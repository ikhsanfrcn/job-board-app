"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";

export default function Page({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = use(params);
  const router = useRouter();
  const { data: session } = useSession();

  const [assessment, setAssessment] = useState<{
    id: string;
    templateId: string;
    title: string;
    description: string;
    parsedQuestions: { question: string; options: string[]; answer?: string }[];
  } | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState(1800); // ✅ Full assessment time = 30 minutes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0, point: 0 });
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isResuming, setIsResuming] = useState(false);

  useEffect(() => {
    const fetchassessment = async () => {
      try {
        // ✅ Check if assessment is already completed
        const completedKey = `assessment-${templateId}-completed`;
        const isAlreadyCompleted = sessionStorage.getItem(completedKey);
        if (isAlreadyCompleted) {
          setCompleted(true);
          const savedScore = sessionStorage.getItem(`assessment-${templateId}-score`);
          if (savedScore) {
            setScore(JSON.parse(savedScore));
          }
          setLoading(false);
          return;
        }

        // ✅ STEP 1: Fetch the assessment template data
        const { data: template } = await axios.get(`/assessment/${templateId}`);

        let parsedQuestions =
          typeof template.questions === "string"
            ? JSON.parse(template.questions)
            : template.questions;

        setAssessment({
          id: template.id,
          templateId: template.id,
          title: template.title,
          description: template.description,
          parsedQuestions,
        });

        // ✅ STEP 2: Start the assessment session (if user is authenticated)
        if (session?.user) {
          try {
            const { data: sessionData } = await axios.post(`/assessment/start/${templateId}`);
            setSessionToken(sessionData.sessionToken);
          } catch (err) {
            console.log("Error starting session:", err);
          }
        }

        // Load saved user answers if they exist
        const savedAnswers = sessionStorage.getItem(`assessment-${templateId}-answers`);
        if (savedAnswers) {
          setUserAnswers(JSON.parse(savedAnswers));
        }

        // Load saved current question index
        const savedQuestionIndex = sessionStorage.getItem(`assessment-${templateId}-currentQuestion`);
        if (savedQuestionIndex) {
          const parsedIndex = parseInt(savedQuestionIndex);
          if (parsedIndex >= 0 && parsedIndex < parsedQuestions.length) {
            setCurrentQuestionIndex(parsedIndex);
            console.log("📍 Loaded saved question index:", parsedIndex);
          }
        }

        // Load remaining assessment time
        const savedTime = sessionStorage.getItem(`assessment-${templateId}-time`);
        if (savedTime) {
          setTimeLeft(parseInt(savedTime));
        }
      } catch (err) {
        console.error("Error fetching assessment:", err);
        setError("Failed to load assessment");
      } finally {
        setLoading(false);
      }
    };

    fetchassessment();
  }, [templateId, session]);

  // Timer for full assessment duration
  useEffect(() => {
    if (completed || !assessment) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTimeLeft = Math.max(prev - 1, 0);
        sessionStorage.setItem(`assessment-${templateId}-time`, newTimeLeft.toString());

        if (newTimeLeft === 0) {
          submitassessment();
        }

        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [completed, assessment]);

  const handleOptionSelect = (index: number, option: string) => {
    const updatedAnswers = { ...userAnswers, [index]: option };
    setUserAnswers(updatedAnswers);

    // Persist answers to sessionStorage
    sessionStorage.setItem(`assessment-${templateId}-answers`, JSON.stringify(updatedAnswers));
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < (assessment?.parsedQuestions.length || 0)) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      
      sessionStorage.setItem(`assessment-${templateId}-currentQuestion`, newIndex.toString());
    } else {
      submitassessment();
    }
  };

  const submitassessment = async () => {
    if (!assessment) return;

    sessionStorage.removeItem(`assessment-${templateId}-answers`);
    sessionStorage.removeItem(`assessment-${templateId}-time`);
    sessionStorage.removeItem(`assessment-${templateId}-currentQuestion`);

    const results = assessment.parsedQuestions.map((q, index) => {
      const selected = userAnswers[index] || "";
      const correct = q.answer === selected;
      return { question: q.question, selected, correct };
    });

    const correctCount = results.filter((r) => r.correct).length;
    const total = results.length;
    const point = Math.round((correctCount / total) * 100);

    try {
      // Use the session-based submission if we have a sessionToken
      if (sessionToken) {
        await axios.post("/assessment/submit", {
          sessionToken,
          answers: Object.entries(userAnswers).map(([index, selected]) => ({
            question: assessment.parsedQuestions[Number(index)]?.question || "",
            selected,
            isCorrect: assessment.parsedQuestions[Number(index)]?.answer === selected,
          })),
        });
      } else {
        console.log("No session token available")
      }
    } catch (err) {
      console.log(err);
    }

    sessionStorage.setItem(`assessment-${templateId}-completed`, "true");
    sessionStorage.setItem(`assessment-${templateId}-score`, JSON.stringify({ correct: correctCount, total, point }));
    setScore({ correct: correctCount, total, point });
    setCompleted(true);
  };

  if (loading) return <p className="text-center text-gray-500">Loading assessment...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (completed) {
    return (
      <div className="w-[80%] mx-auto p-6 bg-white rounded-xl font-sans my-10 text-center">
        <h2 className="text-2xl font-bold mb-4">assessment Completed</h2>
        <p className="text-lg">Correct Answers: {score.correct} / {score.total}</p>
        <p className="text-lg mt-2">Score: {score.point} points</p>
      </div>
    );
  }

  const question = assessment?.parsedQuestions[currentQuestionIndex];

  return (
    <div className="w-[80%] mx-auto p-6 bg-white rounded-xl font-sans my-10">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-xl font-semibold">{assessment?.title}</h2>
        <span className="text-red-500">Time left: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s</span>
      </div>

      <p className="text-gray-600 mb-10">{assessment?.description}</p>

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
          {currentQuestionIndex + 1 === assessment?.parsedQuestions.length ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}