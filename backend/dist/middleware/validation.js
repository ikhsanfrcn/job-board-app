"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateReview = exports.validateUpdateProfile = void 0;
const express_validator_1 = require("express-validator");
exports.validateUpdateProfile = [
    (0, express_validator_1.body)("username").notEmpty().isString(),
    (0, express_validator_1.body)("firstName").notEmpty().isString(),
    (0, express_validator_1.body)("lastName").optional().isString(),
    (0, express_validator_1.body)("gender").optional().isString(),
    (0, express_validator_1.body)("dob").optional().isString(),
    (0, express_validator_1.body)("education").optional().isString(),
    (0, express_validator_1.body)("country").optional().isString(),
    (0, express_validator_1.body)("state").optional().isString(),
    (0, express_validator_1.body)("city").optional().isString(),
    (0, express_validator_1.body)("zipCode").optional().isNumeric(),
    (0, express_validator_1.body)("regionNumber").optional().isNumeric(),
    (0, express_validator_1.body)("phoneNumber").optional().isNumeric(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ errors: errors.array() });
            return;
        }
        next();
    },
];
exports.validateCreateReview = [
    (0, express_validator_1.body)("cultureRating")
        .notEmpty()
        .withMessage("Culture Rating is required")
        .isInt({ min: 1, max: 5 })
        .withMessage("Culture Rating must be between 1 and 5"),
    (0, express_validator_1.body)("workLifeBalanceRating")
        .notEmpty()
        .withMessage("Work Life Balance Rating is required")
        .isInt({ min: 1, max: 5 })
        .withMessage("Work Life Balance Rating must be between 1 and 5"),
    (0, express_validator_1.body)("facilitiesRating")
        .notEmpty()
        .withMessage("Facilities Rating is required")
        .isInt({ min: 1, max: 5 })
        .withMessage("Facilities Rating must be between 1 and 5"),
    (0, express_validator_1.body)("careerOpportunitiesRating")
        .notEmpty()
        .withMessage("Career Opportunities Rating is required")
        .isInt({ min: 1, max: 5 })
        .withMessage("Career Opportunities Rating must be between 1 and 5"),
    (0, express_validator_1.body)("employmentStatus")
        .notEmpty()
        .withMessage("Employment status is required")
        .isString()
        .withMessage("Employment status must be a string"),
    (0, express_validator_1.body)("jobTitle")
        .notEmpty()
        .withMessage("Job title is required")
        .isString()
        .withMessage("Job title must be a string"),
    (0, express_validator_1.body)("headline")
        .notEmpty()
        .withMessage("Headline is required")
        .isString()
        .withMessage("Headline must be a string"),
    (0, express_validator_1.body)("pros")
        .notEmpty()
        .withMessage("Pros are required")
        .isString()
        .withMessage("Pros must be a string"),
    (0, express_validator_1.body)("cons")
        .notEmpty()
        .withMessage("Cons are required")
        .isString()
        .withMessage("Cons must be a string"),
    (0, express_validator_1.body)("advice")
        .notEmpty()
        .withMessage("Advice is required")
        .isString()
        .withMessage("Advice must be a string"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ errors: errors.array() });
            return;
        }
        next();
    },
];
