import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserPayLoad } from "../custom";

export class AuthMiddleware {
  verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        res.status(400).json({ message: "Unauthorized" });
        return
      }

      const verifyUser = verify(token, process.env.JWT_SECRET!);

      req.user = verifyUser as UserPayLoad;
      next();
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
