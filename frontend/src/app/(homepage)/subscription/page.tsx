/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import SubscriptionCard from "./_components/subscriptionCard";

type PlanType = {
  name: string;
  price: number;
  type: string;
  features: string[];
};

export default function SubscriptionPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [plans, setPlans] = useState<PlanType[]>([]);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(true);

  useEffect(() => {
  const fetchPlans = async () => {
    try {
      const res = await axios.get("/subscriptions", );

      const formattedPlans = res.data.data.map((plan: any) => ({
        name: plan.name,
        price: plan.price,
        type: plan.type,
        features: Array.isArray(plan.features) ? plan.features : []
      }));

      setPlans(formattedPlans);
    } catch (error) {
      console.error("Failed to fetch plans:", error);
      toast.error("Gagal mengambil data subscription.");
    } finally {
      setLoadingPlans(false);
    }
  };

  fetchPlans()

}, []);


  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const token = session?.accessToken;
        if (!token) return;

        const response = await axios.get("/subscribers", {
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
          router.push(`/subscription/${subscription.transactionId}`);
          return;
        }

        if (!subscription.startDate || !subscription.endDate || subscription.status === "CANCELED") {
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

      {loadingPlans ? (
        <p className="text-gray-500">Loading plans...</p>
      ) : (
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
                handleSubscribe(plan.type);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );

  async function handleSubscribe(planType: string) {
  try {
    setLoadingPlan(planType);
    const token = session?.accessToken;

    const selectedPlan = plans.find(plan => plan.type === planType);
    if (!selectedPlan) {
      toast.error("Plan not found");
      return;
    }

    const response = await axios.post(
      "/transactions",
      {
        type: planType,
        amount: selectedPlan.price, 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const transactionId = response.data.transaction.data.id;
    router.push(`/subscription/${transactionId}`);
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Subscription failed");
  } finally {
    setLoadingPlan(null);
  }
}

}
