"use client";

import axios from "@/lib/axios";
import { IAssessment } from "@/types/assessment";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import Card from "./card";

export default function Assessments() {
  const { data: user } = useSession();
  const token = user?.accessToken;

  const [loading, setLoading] = useState(false);
  const [assessments, setAssessments] = useState<IAssessment[]>([]);

  const fetchAssessments = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const { data } = await axios.get("/assessment/user-assessment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAssessments(data.userAssessments);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAssessments();
  }, [fetchAssessments]);

  if (loading) return <div>Loading...</div>;
  if (!assessments) return <div>No assessments</div>;

  return (
    <div className="w-full p-4">
      <Card assessments={assessments} />
    </div>
  );
}
