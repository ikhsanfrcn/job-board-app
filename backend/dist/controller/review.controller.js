"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class ReviewController {
    createReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { id: companyId } = req.params;
            const { salaryEstimate, cultureRating, workLifeBalanceRating, facilitiesRating, careerOpportunitiesRating, employmentStatus, jobTitle, headline, pros, cons, advice, } = req.body;
            if (!userId) {
                res.status(401).send({ message: "Unauthorized" });
                return;
            }
            try {
                const existingReview = yield prisma_1.default.review.findUnique({
                    where: {
                        userId_companyId: {
                            userId,
                            companyId,
                        },
                    },
                });
                if (existingReview) {
                    res.status(400).send({
                        message: "You have already reviewed this company.",
                    });
                    return;
                }
                const isAccepted = yield prisma_1.default.application.findFirst({
                    where: {
                        userId: userId,
                        status: "OFFERED",
                        job: {
                            companyId: companyId,
                        },
                    },
                });
                if (!isAccepted) {
                    res.status(400).send({
                        message: "You have not been accepted for this company.",
                    });
                    return;
                }
                const review = yield prisma_1.default.review.create({
                    data: {
                        userId,
                        companyId,
                        salaryEstimate,
                        cultureRating,
                        workLifeBalanceRating,
                        facilitiesRating,
                        careerOpportunitiesRating,
                        employmentStatus,
                        jobTitle,
                        headline,
                        pros,
                        cons,
                        advice,
                    },
                });
                res.status(201).send({
                    message: "Review created successfully",
                    result: review,
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).send(err);
            }
        });
    }
    getCompanyReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: companyId } = req.params;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const skip = (page - 1) * limit;
            try {
                const [reviews, totalReviews] = yield Promise.all([
                    prisma_1.default.review.findMany({
                        where: { companyId },
                        skip,
                        take: limit,
                        orderBy: {
                            createdAt: "desc",
                        },
                    }),
                    prisma_1.default.review.count({
                        where: { companyId },
                    }),
                ]);
                const reviewsWithAverage = reviews.map((review) => {
                    const { cultureRating, workLifeBalanceRating, facilitiesRating, careerOpportunitiesRating, } = review;
                    const averageRating = (cultureRating +
                        workLifeBalanceRating +
                        facilitiesRating +
                        careerOpportunitiesRating) /
                        4;
                    return Object.assign(Object.assign({}, review), { averageRating: parseFloat(averageRating.toFixed(1)) });
                });
                res.status(200).send({
                    message: "Reviews fetched successfully",
                    reviews: reviewsWithAverage,
                    total: totalReviews,
                    currentPage: page,
                    totalPages: Math.ceil(totalReviews / limit),
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).send({ message: "Failed to fetch reviews", error: err });
            }
        });
    }
}
exports.ReviewController = ReviewController;
