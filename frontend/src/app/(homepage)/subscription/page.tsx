/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import SubscriptionCard from "./_components/subscriptionCard";

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
  const router = useRouter();

  const [loadingPlan, setLoadingPlan] = useState<
    "STANDART" | "PROFESSIONAL" | null
  >(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);

  useEffect(() => {
  const fetchSubscriptionStatus = async () => {
    try {
      const token = session?.accessToken;
      if (!token) return;

      const response = await axios.get("/subscriptions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const subscription = response.data;

      if (!subscription) {
        setIsSubscribed(false);
        return;
      }

      if (subscription.status === "PENDING") {
        router.push(`/subscription/${subscription.id}`);
        return;
      }

      if (!subscription.startDate || !subscription.endDate) {
        setIsSubscribed(false);
        return;
      }

      const now = new Date();
      const startDate = new Date(subscription.startDate);
      const endDate = new Date(subscription.endDate);

      const isInRange = now >= startDate && now <= endDate;

      setIsSubscribed(isInRange);
    } catch (error) {
      console.error("Failed to fetch subscription status:", error);
      setIsSubscribed(false);
    }
  };

  if (session?.accessToken) {
    fetchSubscriptionStatus();
  }
}, [session?.accessToken, router]);


  if (session?.accessToken && isSubscribed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (isSubscribed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-green-700 text-xl font-semibold">
          You already have an active subscription. 🎉
        </p>
      </div>
    );
  }

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
          <SubscriptionCard
            key={plan.name}
            name={plan.name}
            price={plan.price}
            features={plan.features}
            loading={loadingPlan === plan.type}
            onSubscribe={() => {
              if (!session) {
                toast.info("Please login first to subscribe.");
                router.push("/login");
                return;
              }
              handleSubscribe(plan.type as "STANDART" | "PROFESSIONAL");
            }}
          />
        ))}
      </div>
    </div>
  );

  async function handleSubscribe(planType: "STANDART" | "PROFESSIONAL") {
    try {
      setLoadingPlan(planType);
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
      router.push(`/subscription/${transactionId}`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Subscription failed");
    } finally {
      setLoadingPlan(null);
    }
  }
}
