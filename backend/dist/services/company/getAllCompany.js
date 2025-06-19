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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCompaniesService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getAllCompaniesService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, city, industryId } = params;
    const filters = {};
    if (name) {
        filters.name = { contains: name, mode: "insensitive" };
    }
    if (city) {
        filters.city = { contains: city, mode: "insensitive" };
    }
    if (industryId) {
        filters.industryId = industryId;
    }
    const companies = yield prisma_1.default.company.findMany({
        where: filters,
        include: {
            Review: {
                select: {
                    cultureRating: true,
                    workLifeBalanceRating: true,
                    facilitiesRating: true,
                    careerOpportunitiesRating: true,
                },
            },
        },
    });
    return companies.map((company) => {
        const reviews = company.Review;
        const totalReviews = reviews.length;
        let totalRatingSum = 0;
        for (const review of reviews) {
            const averagePerReview = (review.cultureRating +
                review.workLifeBalanceRating +
                review.facilitiesRating +
                review.careerOpportunitiesRating) / 4;
            totalRatingSum += averagePerReview;
        }
        const averageRating = totalReviews > 0 ? totalRatingSum / totalReviews : 0;
        const { Review } = company, companyData = __rest(company, ["Review"]);
        return Object.assign(Object.assign({}, companyData), { averageRating: parseFloat(averageRating.toFixed(1)) });
    });
});
exports.getAllCompaniesService = getAllCompaniesService;
