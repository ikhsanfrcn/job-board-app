"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { IUserProfile } from "@/types/userProfile";
import SideBar from "./sidebar";
import ProfileForm from "./profileForm";
import Bowls from "./bowls";

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
      <div className="w-full flex flex-wrap">
        <div className="w-2/12">
          <SideBar />
        </div>
        <div className="w-7/12">
          <ProfileForm
            profileData={userProfile}
            onReload={onReload}
            fetchLoading={loading}
            token={token!}
          />
        </div>
        <div className="w-3/12">
          <Bowls />
        </div>
      </div>
    </div>
  );
}
