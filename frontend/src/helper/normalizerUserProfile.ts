import { IUserProfile } from "@/types/userProfile";

export function normalizeProfile(profile: Partial<IUserProfile>): IUserProfile {
  return {
    id: profile.id ?? 0,
    role: profile.role ?? "",
    avatar: profile.avatar ?? "",
    email: profile.email ?? "",
    username: profile.username ?? "",
    firstName: profile.firstName ?? "",
    lastName: profile.lastName ?? "",
    gender: profile.gender ?? "",
    dob: profile.dob ?? "",
    education: profile.education ?? "",
    country: profile.country ?? "",
    state: profile.state ?? "",
    city: profile.city ?? "",
    zipCode: profile.zipCode ?? "",
    regionNumber: profile.regionNumber ?? "",
    phoneNumber: profile.phoneNumber ?? "",
  };
}

