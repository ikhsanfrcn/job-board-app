"use client";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function VerifyCompany({ token }: { token: string }) {
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("Verifying your account...");
  const [countdown, setCountdown] = useState(6);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onVerify = async () => {
      try {
        const { data } = await axios.patch(
          "/company/verify",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(data.message || "Verification successful");
        setStatusMessage("Your account has been successfully verified.");
        setIsSuccess(true);
      } catch (err) {
        if (err instanceof AxiosError) {
          const msg = err.response?.data?.message || "Verification failed";
          toast.error(msg);
          setStatusMessage(msg);
        } else {
          toast.error("Unexpected error");
          setStatusMessage("Unexpected error during verification.");
        }
      } finally {
        setLoading(false);
      }
    };

    onVerify();
  }, [token]);

  useEffect(() => {
    if (!isSuccess) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isSuccess]);

  useEffect(() => {
    if (countdown === 0 && isSuccess) {
      router.push("/company/login");
    }
  }, [countdown, isSuccess, router]);

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4 text-center px-4">
      {loading ? (
        <>
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          <p className="text-lg font-medium">{statusMessage}</p>
        </>
      ) : (
        <>
          <div className={`text-xl font-semibold ${isSuccess ? "text-green-600" : "text-red-600"}`}>
            {statusMessage}
          </div>

          {isSuccess && (
            <p className="text-sm text-gray-500">
              Redirecting to login page in {countdown} seconds...
            </p>
          )}

          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-blue-700 transition"
          >
            Go to homepage
          </button>
        </>
      )}
    </div>
  );
}
