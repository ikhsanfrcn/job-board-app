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

export const validateCreateReview = [
  body("cultureRating")
    .notEmpty()
    .withMessage("Culture Rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Culture Rating must be between 1 and 5"),

  body("workLifeBalanceRating")
    .notEmpty()
    .withMessage("Work Life Balance Rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Work Life Balance Rating must be between 1 and 5"),

  body("facilitiesRating")
    .notEmpty()
    .withMessage("Facilities Rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Facilities Rating must be between 1 and 5"),

  body("careerOpportunitiesRating")
    .notEmpty()
    .withMessage("Career Opportunities Rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Career Opportunities Rating must be between 1 and 5"),

  body("employmentStatus")
    .notEmpty()
    .withMessage("Employment status is required")
    .isString()
    .withMessage("Employment status must be a string"),

  body("jobTitle")
    .notEmpty()
    .withMessage("Job title is required")
    .isString()
    .withMessage("Job title must be a string"),

  body("headline")
    .notEmpty()
    .withMessage("Headline is required")
    .isString()
    .withMessage("Headline must be a string"),

  body("pros")
    .notEmpty()
    .withMessage("Pros are required")
    .isString()
    .withMessage("Pros must be a string"),

  body("cons")
    .notEmpty()
    .withMessage("Cons are required")
    .isString()
    .withMessage("Cons must be a string"),

  body("advice")
    .notEmpty()
    .withMessage("Advice is required")
    .isString()
    .withMessage("Advice must be a string"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() });
      return;
    }
    next();
  },
];
