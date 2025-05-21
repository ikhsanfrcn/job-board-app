"use client";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function VerifyUser({ token }: { token: string }) {
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(
    "Verifying your account..."
  );
  const router = useRouter();

  useEffect(() => {
    const onVerify = async () => {
      if (!token) {
        toast.error("Missing verification token.");
        setStatusMessage("Token not provided.");
        setLoading(false);
        setTimeout(() => router.push("/"), 2000);
        return;
      }

      try {
        const { data } = await axios.patch(
          "/auth/verify",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(data.message || "Verification successful");
        setStatusMessage("Your account has been successfully verified.");
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
        setTimeout(() => router.push("/"), 3000);
      }
    };

    onVerify();
  }, [router, token]);

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4 text-center px-4">
      {loading ? (
        <>
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          <p className="text-lg font-medium">{statusMessage}</p>
        </>
      ) : (
        <>
          <div className="text-green-600 text-xl font-semibold">
            {statusMessage}
          </div>
          <p className="text-sm text-gray-500">Redirecting to homepage...</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-green-700 transition"
          >
            Go now
          </button>
        </>
      )}
    </div>
  );
}
