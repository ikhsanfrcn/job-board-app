import { ICompanyProfile } from "@/types/companyType";

export function normalizeCompanyProfile(
  profile: ICompanyProfile
): ICompanyProfile {
  return {
    id: profile.id,
    name: profile.name ?? "",
    email: profile.email ?? "",
    role: profile.role ?? "company",
    about: profile.about ?? "",
    country: profile.country ?? "",
    state: profile.state ?? "",
    city: profile.city ?? "",
    zipCode: profile.zipCode ?? "",
    regionNumber: profile.regionNumber ?? "",
    phoneNumber: profile.phoneNumber ?? "",
    address: profile.address ?? "",
    website: profile.website ?? "",
    logo:
      profile.logo ??
      "https://res.cloudinary.com/dbq88i6pk/image/upload/v1744257650/profile-default-icon-512x511-v4sw4m29_cyf3m5.png",
    isVerify: profile.isVerify ?? false,
    industryId: profile.industryId,
    latitude: profile.latitude ?? "",
    longitude: profile.longitude ?? "",
  };
}
