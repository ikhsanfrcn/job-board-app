import { sign } from "jsonwebtoken";

export const generateToken = (payload: object) => {
  return sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
};
