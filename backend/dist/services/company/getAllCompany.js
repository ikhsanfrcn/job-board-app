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
    const { name, city, sort, page = 1, limit = 10 } = params;
    const filters = {};
    if (name) {
        filters.name = { contains: name, mode: "insensitive" };
    }
    if (city) {
        filters.city = { contains: city, mode: "insensitive" };
    }
    let orderBy;
    if (sort === "name_asc")
        orderBy = { name: "asc" };
    else if (sort === "name_desc")
        orderBy = { name: "desc" };
    const totalCount = yield prisma_1.default.company.count({ where: filters });
    const skip = (page - 1) * limit;
    const companies = yield prisma_1.default.company.findMany({
        where: filters,
        orderBy,
        skip,
        take: limit,
        select: {
            id: true,
            name: true,
            about: true,
            city: true,
            logo: true,
            createdAt: true,
            updatedAt: true,
            Review: {
                select: {
                    cultureRating: true,
                    workLifeBalanceRating: true,
                    facilitiesRating: true,
                    careerOpportunitiesRating: true,
                },
            },
            jobs: {
                select: {
                    id: true,
                    Application: {
                        select: {
                            id: true,
                            status: true,
                        },
                    },
                },
            },
        },
    });
    const mapped = companies.map((company) => {
        const reviews = company.Review;
        const totalReviews = reviews.length;
        const totalRatingSum = reviews.reduce((sum, review) => {
            const avg = (review.cultureRating +
                review.workLifeBalanceRating +
                review.facilitiesRating +
                review.careerOpportunitiesRating) /
                4;
            return sum + avg;
        }, 0);
        const averageRating = totalReviews > 0 ? totalRatingSum / totalReviews : 0;
        const totalJobs = company.jobs.length;
        const allApplications = company.jobs.flatMap((job) => job.Application);
        const totalApplicants = allApplications.length;
        const totalAcceptedApplicants = allApplications.filter((app) => app.status === "ACCEPTED").length;
        const { Review, jobs } = company, companyData = __rest(company, ["Review", "jobs"]);
        return Object.assign(Object.assign({}, companyData), { averageRating: parseFloat(averageRating.toFixed(1)), totalJobs,
            totalApplicants, totalEmployees: totalAcceptedApplicants });
    });
    if (sort === "rating_asc") {
        mapped.sort((a, b) => a.averageRating - b.averageRating);
    }
    else if (sort === "rating_desc") {
        mapped.sort((a, b) => b.averageRating - a.averageRating);
    }
    return {
        data: mapped,
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
    };
});
exports.getAllCompaniesService = getAllCompaniesService;
