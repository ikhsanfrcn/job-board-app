import jwt from "jsonwebtoken";

export const decodeToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    throw { status: 400, message: "Invalid or expired token" };
  }
};
