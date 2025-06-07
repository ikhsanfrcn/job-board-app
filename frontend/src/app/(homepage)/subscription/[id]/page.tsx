"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/lib/axios";
import { Modal } from "@/components/atoms/Modal";

type TransactionData = {
  id: string;
  type: string;
  status: "Paid" | "Unpaid";
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

  useEffect(() => {
    async function fetchTransaction() {
      const { data } = await axios.get(`/subscriptions/${id}`);
      setTransaction(data);

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const deadline = new Date(data.expiredAt).getTime();
        const distance = deadline - now;
        if (distance <= 0) {
          clearInterval(interval);
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

      return () => clearInterval(interval);
    }

    fetchTransaction();
  }, [id]);

  if (!transaction) return <div>Loading...</div>;

  const handleOpenPayment = () => {
    if (!transaction) return;
    if (!transaction.invoiceUrl) {
      alert("Invoice URL not available.");
      return;
    }

    setInvoiceUrl(transaction.invoiceUrl);
    setIsModalOpen(true);
  };

  function getPriceByPlanType(planType: string): number {
  switch (planType.toUpperCase()) {
    case 'STANDART':
      return 25000;
    case 'PROFESSIONAL':
      return 100000;
    default:
      return 0;
  }
}

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
              <span className="text-yellow-600 font-bold">
                {transaction.status}
              </span>
            }
          />
          <Info label="Price" value={`IDR ${getPriceByPlanType(transaction.type)}`} />
          <Info label="Created At" value={formatDate(transaction.createdAt)} />
        </div>
        <div className="text-red-600 mt-4 text-sm">
          Please make payment before {formatDate(transaction.expiredAt)}
        </div>
        <div className="text-center font-bold text-pink-600 text-xl mt-1">
          Expires in {countdown}
        </div>
        <button
          onClick={handleOpenPayment}
          className="mt-6 w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition"
        >
          Pay Subscription
        </button>
      </div>
      {/* Modal */}
      {isModalOpen && invoiceUrl && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Complete Your Payment" size="lg">
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
