"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";

const plans = [
  {
    name: "Standard Plan",
    price: 25000,
    type: "STANDART",
    features: ["CV Generator", "2x Skill Assessment"],
  },
  {
    name: "Professional Plan",
    price: 100000,
    type: "PROFESSIONAL",
    features: [
      "CV Generator",
      "Unlimited Skill Assessment",
      "Job Application Review Priority",
    ],
  },
];

export default function SubscriptionPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async (planType: "REGULAR" | "PREMIUM") => {
    try {
      setLoading(true);
      const token = session?.accessToken;

      const response = await axios.post(
        "/subscriptions",
        { type: planType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      
      const transactionId = response.data.result.data.id;

      console.log(transactionId);

      toast.success("Subscription successful!");
      router.push(`/subscription/${transactionId}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-blue-900 mb-2">
        Subscription Plan
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Take your career to the next level with the right plan!
        <br />
        Unlock exclusive features for 30 days and gain a competitive edge.
        <br />
        <span className="font-semibold text-blue-800">
          Get started today—your future awaits!
        </span>
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="border rounded-xl shadow-md p-6 w-full md:w-80"
          >
            <h2 className="text-xl font-bold text-pink-600 mb-2">
              {plan.name}
            </h2>
            <p className="text-2xl font-semibold text-blue-900 mb-2">
              IDR {`${plan.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </p>
            <p className="text-gray-600 mb-4">for 30 days</p>
            <ul className="list-disc list-inside mb-6 text-sm text-gray-700">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              onClick={() =>
                handleSubscribe(plan.type as "REGULAR" | "PREMIUM")
              }
              disabled={loading}
              className="bg-pink-600 text-white w-full py-2 rounded-md hover:bg-pink-700 transition"
            >
              {loading ? "Processing..." : "Subscribe"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
