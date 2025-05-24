"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { IUserProfile } from "@/types/userProfile";
import ProfileForm from "./profileForm";
import SideBar from "./sidebar";
import Bowls from "./bowl";
import { ICompanyProfile } from "@/types/companyType";

export default function Profile() {
  const { data: user } = useSession();
  const [companyProfile, setCompanyProfile] = useState<ICompanyProfile>();
  const [loading, setLoading] = useState(true);
  const token = user?.accessToken;

  const fetchCompanyProfile = useCallback(async () => {
    if (!token) return;

    try {
    } catch (err) {
      console.error("Failed to fetch user profile", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCompanyProfile();
  }, [fetchCompanyProfile]);

  const onReload = () => {
    fetchCompanyProfile();
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-wrap">
        <div className="hidden md:block md:w-3/12">
          <SideBar />
        </div>
        <div className="w-full md:w-6/12">
          <ProfileForm />
        </div>
        <div className="hidden md:block md:w-3/12">
          <Bowls />
        </div>
      </div>
    </div>
  );
}
