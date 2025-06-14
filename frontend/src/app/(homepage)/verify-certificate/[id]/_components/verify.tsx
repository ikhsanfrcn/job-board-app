"use client";

import axios from "@/lib/axios";
import { IUserAssessment } from "@/types/assessment";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";

interface IProps {
  id: string;
}

export default function Verify({ id }: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [certificate, setCertificate] = useState<IUserAssessment | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificate = useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`/assessment/verify/${id}`);
      setCertificate(data.assessment);
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        setError(
          err.response?.data?.message || "Certificate not found or invalid."
        );
        toast.error(err.response?.data?.message || "Create Failed !");
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCertificate();
  }, [fetchCertificate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && error && (
          <div className="flex flex-col items-center justify-center h-64 text-red-500">
            <AiOutlineCloseCircle className="text-5xl mb-2" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!isLoading && certificate && (
          <div className="border border-gray-200 rounded-xl shadow-sm p-6 space-y-6 bg-white">
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-semibold text-gray-800">
                Certificate Verified
              </h1>
              <p className="text-sm text-gray-500">
                This certificate is valid and belongs to the user below.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="text-gray-500">Full Name</p>
                <p className="font-medium">
                  {certificate.user.firstName} {certificate.user.lastName}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Username</p>
                <p>{certificate.user.username}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500">Email</p>
                <p>{certificate.user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="text-gray-500">Title</p>
                <p>{certificate.template.title}</p>
              </div>
              <div>
                <p className="text-gray-500">Category</p>
                <p>{certificate.template.category}</p>
              </div>
              <div>
                <p className="text-gray-500">Score</p>
                <p>
                  {certificate.score} / {certificate.totalPoints}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="flex items-center gap-1 font-medium">
                  {certificate.isPassed ? (
                    <>
                      <AiOutlineCheckCircle className="text-green-500" />
                      Passed
                    </>
                  ) : (
                    <>
                      <AiOutlineCloseCircle className="text-red-500" />
                      Not Passed
                    </>
                  )}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Time Spent</p>
                <p>{certificate.timeSpent} seconds</p>
              </div>
              <div>
                <p className="text-gray-500">Started</p>
                <p>{new Date(certificate.startedAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Completed</p>
                <p>{new Date(certificate.completedAt).toLocaleString()}</p>
              </div>
            </div>

            {/* <div className="flex flex-col items-center gap-2">
              <div className="bg-white p-3 border rounded-lg shadow-sm">
                <QRCode
                  value={`https://yourdomain.com/verify/${id}`}
                  size={100}
                />
              </div>
              <p className="text-xs text-gray-400">Scan QR to verify</p>
            </div> */}

            <footer className="text-center text-xs text-gray-400 pt-6 border-t">
              © {new Date().getFullYear()} JobsDoors
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}
