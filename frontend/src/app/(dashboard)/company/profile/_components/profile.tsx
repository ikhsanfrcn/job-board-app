"use client";

import { useSession } from "next-auth/react";
import { ICompanyProfile } from "@/types/companyType";
import { useCallback, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { MdOutlineModeEdit } from "react-icons/md";
import ProfileForm from "./profileForm";
import ProfileSkeleton from "./profileSkeleton";

export default function Profile() {
  const { data: company } = useSession();
  const token = company?.accessToken;

  const [profile, setProfile] = useState<ICompanyProfile>();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const { data } = await axios.get("/company/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(data.profile);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) return <ProfileSkeleton />;
  if (!profile) return <div>No profile data.</div>;

  return (
    <div className="w-full">
      <div className="p-6">
        <div className="flex items-center mb-2 space-x-2">
          <h2 className="text-xl font-semibold">My Information</h2>
          {!isEditing && (
            <MdOutlineModeEdit
              className="text-4xl p-2 rounded-full hover:bg-gray-200 cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
          )}
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Update your personal details to keep your profile up to date.
        </p>

        {!isEditing && (
          <div className="space-y-4 text-sm text-gray-800">
            <div>
              <p className="text-xs font-medium capitalize">Name:</p>
              <p>{profile.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium capitalize">Email:</p>
              <p>{profile.email}</p>
            </div>
            <div>
              <p className="text-xs font-medium capitalize">Phone Number:</p>
              <p>{profile.phoneNumber || "-"}</p>
            </div>
            <div>
              <p className="text-xs font-medium capitalize">Country:</p>
              <p>{profile.country || "-"}</p>
            </div>
            <div>
              <p className="text-xs font-medium capitalize">State:</p>
              <p>{profile.state || "-"}</p>
            </div>
            <div>
              <p className="text-xs font-medium capitalize">City:</p>
              <p>{profile.city || "-"}</p>
            </div>
            <div>
              <p className="text-xs font-medium capitalize">Zip Code:</p>
              <p>{profile.zipCode || "-"}</p>
            </div>
            <div>
              <p className="text-xs font-medium capitalize">Address:</p>
              <p>{profile.address || "-"}</p>
            </div>
            <div>
              <p className="text-xs font-medium capitalize">Latitude:</p>
              <p>{profile.latitude || "-"}</p>
            </div>
            <div>
              <p className="text-xs font-medium capitalize">Longtitude:</p>
              <p>{profile.longitude || "-"}</p>
            </div>
            <div>
              <p className="text-xs font-medium capitalize">Website:</p>
              <p>{profile.website || "-"}</p>
            </div>
            <div>
              <p className="text-xs font-medium capitalize">About:</p>
              <p>{profile.about || "-"}</p>
            </div>
          </div>
        )}

        {isEditing && (
          <ProfileForm
            profile={profile}
            token={token}
            setProfile={setProfile}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
    </div>
  );
}
