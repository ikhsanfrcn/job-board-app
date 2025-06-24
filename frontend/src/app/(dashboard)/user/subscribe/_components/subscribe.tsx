"use client";

import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import SubscribePlan from "./subscribePlan";

interface ISubscribe {
  isValid: boolean;
  activeSubscription: iActiveSubscription;
}

interface iActiveSubscription {
  endDate: Date;
  startDate: Date;
  type: string;
}

export default function Subscribe() {
  const [subscribe, setSubscribe] = useState<ISubscribe>();
  const [loading, setLoading] = useState(true);

  const { data } = useSession();
  const token = data?.accessToken;

  const fetchSubscribe = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const { data } = await axios.get("/users/is-subscribe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = data.result;
      result.activeSubscription.startDate = new Date(
        result.activeSubscription.startDate
      );
      result.activeSubscription.endDate = new Date(
        result.activeSubscription.endDate
      );

      setSubscribe(result);
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchSubscribe();
  }, [fetchSubscribe]);

  function formatDate(date: Date) {
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-gray-600">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin" />
        <p className="text-sm font-medium">
          Loading subscription information...
        </p>
      </div>
    );
  }
  return (
    <div className="w-full md:px-8">
      <div className="mt-3 p-3 h-full font-sans">
        {subscribe?.isValid ? (
          <div className="w-full md:px-8">
            <div className="mt-3 p-7 h-full">
              <div className="flex flex-col items-center font-sans">
                <h2 className="text-3xl font-semibold tracking-tight text-green-600">
                  Congratulations!
                </h2>
                <hr className="w-[70%] my-3 text-gray-300" />
                <p className="text-lg mt-3 text-center">
                  You have an active subscription
                </p>
                <div className="mt-5 p-5 border border-sky-200 rounded-lg">
                  <p className="text-center text-green-600">
                    Your subscription is currently active and you have access to
                    all <strong>{subscribe.activeSubscription.type}</strong>{" "}
                    features.
                    <br />
                    Valid from{" "}
                    <strong>
                      {formatDate(subscribe.activeSubscription.startDate)}
                    </strong>{" "}
                    to{" "}
                    <strong>
                      {formatDate(subscribe.activeSubscription.endDate)}
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-center my-10 px-4">
              <Link
                href={"/"}
                className="h-15 lg:h-30 p-4 flex flex-col items-center justify-center bg-green-100 rounded-md shadow-md border border-green-600 hover:scale-105 transition duration-200"
              >
                CV Generator
              </Link>
              <Link
                href={"/user/subscribe/skill-assessment"}
                className="h-15 lg:h-30 p-4 flex flex-col items-center justify-center bg-sky-100 rounded-md shadow-md border border-sky-600 hover:scale-105 transition duration-200"
              >
                Skill Assessment
              </Link>
              <Link
                href={"/user/profile"}
                className="h-15 lg:h-30 p-4 flex flex-col items-center justify-center bg-gray-100 rounded-md shadow-md border border-gray-600 hover:scale-105 transition duration-200"
              >
                Certificate Generator
              </Link>
            </div>
          </div>
        ) : (
          <SubscribePlan />
        )}
      </div>
    </div>
  );
}
