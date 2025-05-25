import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateUpdateProfile = [
  body("username").notEmpty().isString(),
  body("firstName").notEmpty().isString(),
  body("lastName").optional().isString(),
  body("gender").optional().isString(),
  body("dob").optional().isString(),
  body("education").optional().isString(),
  body("country").optional().isString(),
  body("state").optional().isString(),
  body("city").optional().isString(),
  body("zipCode").optional().isNumeric(),
  body("regionNumber").optional().isNumeric(),
  body("phoneNumber").optional().isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() });
      return;
    }
    next();
  },
];
