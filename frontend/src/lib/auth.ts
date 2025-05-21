import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";

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
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
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
      return token;
    },
    async session({ token, session }: { token: JWT; session: Session }) {
      session.user = {
        id: token.id as number,
        username: token.username as string,
        email: token.email as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        gender: token.gender as string,
        dob: token.dob as string,
        education: token.education as string,
        country: token.country as string,
        state: token.state as string,
        city: token.city as string,
        zipCode: token.zipConde as string,
        regionNumber: token.regionNumber as string,
        phoneNumber: token.phoneNumber as string,
        avatar: token.avatar as string,
      };
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
