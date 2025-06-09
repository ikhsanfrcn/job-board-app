import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import axios from "./axios";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(user) {
        if (user) return user;
        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      async profile(profile) {
        console.log("Google Profile:", profile);
        console.log("Google Profile Sub (Google's ID):", profile.sub);

        try {
          console.log("Checking for existing user with email:", profile.email);
          const { data: existingUser } = await axios.get(
            `/users/user-email/${profile.email}`
          );

          if (existingUser) {
            console.log("Found existing user:", existingUser);
            console.log("Existing user ID:", existingUser.id);
            return {
              id: existingUser.id,
              username: existingUser.username,
              email: existingUser.email,
              avatar: existingUser.avatar,
            };
          }

          console.log("Creating new user...");
          const userData = {
            username: profile.given_name,
            email: profile.email,
            password: profile.at_hash,
            avatar: profile.picture,
          };

          console.log("Sending user data to API:", userData);
          const { data: response } = await axios.post("/auth/google", userData);
          console.log("API Response:", response);

          const createUser = response.data;
          console.log("Created user:", createUser);
          console.log("Created user ID:", createUser.id);
          const token = createUser.access_token;

          return {
            id: createUser.id,
            username: createUser.username,
            email: createUser.email,
            avatar: createUser.avatar,
            accessToken: token,
            // ...user, // kalau mau bawa data lain ke JWT
          };
        } catch (err) {
          console.error("Error during Google auth:", err);
          throw new Error("Authentication failed!");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.gender = user.gender;
        token.dob = user.dob;
        token.education = user.education;
        token.country = user.country;
        token.state = user.state;
        token.city = user.city;
        token.zipCode = user.zipCode;
        token.regionNumber = user.regionNumber;
        token.phoneNumber = user.phoneNumber;
        token.avatar = user.avatar;
        token.accessToken = user.accessToken;
      }
      if (account?.provider === "google" && profile?.email) {
        try {
          const { data: existingUser } = await axios.get(
            `/users/user-email/${profile.email}`
          );

          if (existingUser) {
            token.id = existingUser.id;
            token.username = existingUser.username;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.avatar = existingUser.avatar;
          } 
        } catch (err) {
          console.error("Error during Google login:", err);
        }
      }
      return token;
    },
    async session({ token, session }: { token: JWT; session: Session }) {
      session.user = {
        id: token.id as string,
        username: token.username as string,
        email: token.email as string,
        role: token.role as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        gender: token.gender as string,
        dob: token.dob as string,
        education: token.education as string,
        country: token.country as string,
        state: token.state as string,
        city: token.city as string,
        zipCode: token.zipCode as string,
        regionNumber: token.regionNumber as string,
        phoneNumber: token.phoneNumber as string,
        avatar: token.avatar as string,
      };
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
