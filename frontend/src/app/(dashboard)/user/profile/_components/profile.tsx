"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { IUserProfile } from "@/types/userProfile";
import ProfileForm from "./profileForm";

export default function Profile() {
  const { data: user } = useSession();
  const [userProfile, setUserProfile] = useState<IUserProfile>();
  const [loading, setLoading] = useState(true);
  const token = user?.accessToken;

  const fetchUserProfile = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      const { data } = await axios.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserProfile(data.user);
    } catch (err) {
      console.error("Failed to fetch user profile", err);
    } finally {
      setLoading(false);
    }
  }, [user?.accessToken]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const onReload = () => {
    fetchUserProfile();
  };

  return (
    <div className="w-full">
      <ProfileForm
        profileData={userProfile}
        onReload={onReload}
        fetchLoading={loading}
        token={token!}
      />
    </div>
  );
}
