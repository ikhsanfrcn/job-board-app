import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: number;
      username?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      gender?: string;
      dob?: string;
      education?: string;
      country?: string;
      state?: string;
      city?: string;
      zipCode?: string;
      regionNumber?: string;
      phoneNumber?: string;
      avatar?: string;
    };
    accessToken?: string;
  }

  interface JWT {
    id?: number;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dob?: string;
    education?: string;
    country?: string;
    state?: string;
    city?: string;
    zipCode?: string;
    regionNumber?: string;
    phoneNumber?: string;
    avatar?: string;
    accessToken?: string;
  }

  interface User {
    id?: number;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dob?: string;
    education?: string;
    country?: string;
    state?: string;
    city?: string;
    zipCode?: string;
    regionNumber?: string;
    phoneNumber?: string;
    avatar?: string;
    accessToken?: string;
  }
}
