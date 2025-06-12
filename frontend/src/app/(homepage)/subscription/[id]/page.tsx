"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { Modal } from "@/components/atoms/Modal";
import { toast } from "react-toastify";

type TransactionData = {
  id: string;
  type: string;
  status: "PAID" | "PENDING" | "EXPIRED" | "CANCELED";
  price: number;
  createdAt: string;
  updatedAt: string;
  expiredAt: string;
  user: {
    username: string;
    email: string;
  };
  invoiceUrl: string;
};

export default function TransactionDetailPage() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState<TransactionData | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;
    let statusInterval: NodeJS.Timeout;

    async function fetchTransaction() {
      try {
        const { data } = await axios.get(`/transactions/${id}`);
        setTransaction(data);

        countdownInterval = setInterval(() => {
          const now = new Date().getTime();
          const deadline = new Date(data.expiredAt).getTime();
          const distance = deadline - now;

          if (distance <= 0) {
            clearInterval(countdownInterval);
            setCountdown("Expired");
          } else {
            const hours = Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setCountdown(
              `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
                2,
                "0"
              )} : ${String(seconds).padStart(2, "0")}`
            );
          }
        }, 1000);

        if (data.status === "PENDING") {
          statusInterval = setInterval(async () => {
            try {
              const { data: updatedData } = await axios.get(
                `/transactions/${id}`
              );
              if (updatedData.status !== "PENDING") {
                clearInterval(statusInterval);
                setTransaction(updatedData);
              }
            } catch (err) {
              console.error("Failed to poll payment status", err);
            }
          }, 10000); //10 detik
        }
      } catch (err) {
        console.error("Failed to fetch transaction", err);
      }
    }

    fetchTransaction();

    return () => {
      clearInterval(countdownInterval);
      clearInterval(statusInterval);
    };
  }, [id]);

  if (!transaction) return <div>Loading...</div>;

  const handleOpenPayment = () => {
    if (!transaction) return;
    if (!transaction.invoiceUrl) {
      toast.info("Invoice URL not available.");
      return;
    }

    setInvoiceUrl(transaction.invoiceUrl);
    setIsModalOpen(true);
  };

  const handleCancelPayment = async () => {
    try {
      await axios.patch(`/transactions/cancel`, {
        id: transaction.id,
      });

      toast.info("Payment cancelled successfully.");

      setTransaction({
      ...transaction!,
      status: "CANCELED",
    });
    } catch (err) {
      console.error("Failed to cancel payment", err);
      toast.error("Failed to cancel payment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Transaction Detail
        </h1>
        <div className="space-y-2 text-sm">
          <Info label="Transaction ID" value={transaction.id} />
          <Info label="User Email" value={transaction.user.email} />
          <Info label="Subscription" value={transaction.type} />
          <Info
            label="Status"
            value={
              <span
                className={
                  transaction.status === "PAID"
                    ? "text-green-600 font-bold"
                    : transaction.status === "EXPIRED"
                    ? "text-red-600 font-bold"
                    : "text-yellow-600 font-bold"
                }
              >
                {transaction.status}
              </span>
            }
          />
          <Info
            label="Price"
            value={`IDR ${getPriceByPlanType(transaction.type)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
          />
          <Info label="Created At" value={formatDate(transaction.createdAt)} />
        </div>

        {transaction.status === "PENDING" && (
          <div>
            <div className="text-red-600 mt-4 text-sm">
              Please make payment before {formatDate(transaction.expiredAt)}
            </div>
            <div className="text-center font-bold text-pink-600 text-xl mt-1">
              Expires in {countdown}
            </div>
          </div>
        )}

        {transaction.status === "PAID" ? (
          <button
            onClick={() => router.push("/")}
            className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 cursor-pointer transition"
          >
            Back to home
          </button>
        ) : transaction.status === "EXPIRED" ? (
          <button
            onClick={() => router.push("/")}
            className="mt-6 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 cursor-pointer transition"
          >
            Back to Home
          </button>
        ) : transaction.status === "CANCELED" ? (
          <button
            onClick={() => router.push("/")}
            className="mt-6 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 cursor-pointer transition"
          >
            Back to Home
          </button>
        ) : (
          <>
            <button
              onClick={handleOpenPayment}
              className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 cursor-pointer transition"
            >
              Pay Subscription
            </button>
            <button
              onClick={handleCancelPayment}
              className="mt-2 w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 cursor-pointer transition"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && invoiceUrl && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Complete Your Payment"
          size="lg"
        >
          <iframe
            src={invoiceUrl}
            width="100%"
            height="400px"
            className="border rounded"
            allow="payment"
          />
        </Modal>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <p>
      <span className="font-semibold">{label}</span> : {value}
    </p>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getPriceByPlanType(planType: string): number {
  switch (planType.toUpperCase()) {
    case "STANDARD":
      return 25000;
    case "PROFESSIONAL":
      return 100000;
    default:
      return 0;
  }
}
