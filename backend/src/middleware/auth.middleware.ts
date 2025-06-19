import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export class AuthMiddleware {
  verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        res.status(400).json({ message: "Unauthorized" });
        return;
      }

      const decoded = verify(token, process.env.JWT_SECRET!) as any;

      if (decoded?.role === "company") {
        req.company = {
          id: decoded.id,
          role: decoded.role,
        };
      } else {
        req.user = {
          id: decoded.id,
          role: decoded.role,
        };
      }

      next();
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  verifyRole(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== "developer") {
        res.status(403).json({ message: "developer only" });
      }
      next();
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
