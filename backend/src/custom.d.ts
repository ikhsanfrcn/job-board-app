import "express";
import { User } from "../prisma/generated/prisma";

export type UserPayLoad = {
  id: string;
  role: string;
};

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayLoad;
    }
  }
}
