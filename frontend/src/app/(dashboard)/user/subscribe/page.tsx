"use client";

import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SubscribePlan from "./_components/subscribePlan";
import Link from "next/link";

interface ISubscriber {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  type: string;
}

export default function SubscribePage() {
  const [subscriber, setSubscriber] = useState<ISubscriber | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { data } = useSession();
  const token = data?.accessToken;

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      try {
        const subscribe = await axios.get(`/subscribers`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSubscriber(subscribe.data);

        const now = new Date();
        const startDate = new Date(subscribe.data.startDate);
        const endDate = new Date(subscribe.data.endDate);

        const isInRange = now >= startDate && now <= endDate;

        setIsActive(isInRange);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, []);

  if (!subscriber && token) {
    return (
      <div className="w-full md:px-14 mt-3">
        <div className="mt-3 p-7 border border-gray-200 h-full rounded-xl shadow-sm">
          <div className="flex justify-center items-center">
            <p>Loading subscription information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:px-14">
      <div className="mt-3 p-3 border border-gray-200 h-full rounded-xl shadow-sm font-sans">
        {isActive ? (
          <>
            <div className="w-full md:px-14">
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
                      Your subscription is currently active and you have access
                      to all premium features.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-5 text-center my-10">
                <Link
                  href={"/"}
                  className="w-60 h-30 p-2 flex flex-col items-center justify-center bg-green-100 rounded-md shadow-md border border-green-600 hover:scale-105 transition duration-200"
                >
                  CV Generator
                </Link>
                <Link
                  href={"/"}
                  className="w-60 h-30 p-2 flex flex-col items-center justify-center bg-sky-100 rounded-md shadow-md border border-sky-600 hover:scale-105 transition duration-200"
                >
                  Skill Assessment
                </Link>
                {subscriber && subscriber.type === "PROFESSIONAL" && (
                  <Link
                    href={"/"}
                    className="w-60 h-30 p-2 flex flex-col items-center justify-center bg-gray-100 rounded-md shadow-md border border-gray-600 hover:scale-105 transition duration-200"
                  >
                    Certificate Generator
                  </Link>
                )}
              </div>
            </div>
          </>
        ) : (
          <SubscribePlan />
        )}
      </div>
    </div>
  );
}
