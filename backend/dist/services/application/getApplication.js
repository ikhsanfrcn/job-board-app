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
exports.getUserApplications = void 0;
exports.getCompanyApplicationsService = getCompanyApplicationsService;
const prisma_1 = require("../../../prisma/generated/prisma");
const prisma_2 = __importDefault(require("../../prisma"));
const getUserApplications = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, title, company, status, sortBy = "createdAt", sortOrder = "desc", page = 1, limit = 10, }) {
    const skip = (page - 1) * limit;
    const take = limit;
    const jobFilter = {};
    if (title) {
        jobFilter.title = {
            contains: title,
            mode: "insensitive",
        };
    }
    if (company) {
        jobFilter.company = {
            name: {
                contains: company,
                mode: "insensitive",
            },
        };
    }
    const where = Object.assign(Object.assign({ userId }, (status && { status })), (Object.keys(jobFilter).length > 0 && {
        job: jobFilter,
    }));
    const isJobField = sortBy === "title";
    const validApplicationFields = ["createdAt", "status", "expectedSalary"];
    let orderBy = { createdAt: "desc" };
    if (isJobField) {
        orderBy = { job: { title: sortOrder } };
    }
    else if (validApplicationFields.includes(sortBy)) {
        orderBy = { [sortBy]: sortOrder };
    }
    const totalApplications = yield prisma_2.default.application.count({ where });
    const applications = yield prisma_2.default.application.findMany({
        where,
        include: {
            job: {
                include: {
                    company: {
                        select: {
                            name: true,
                            logo: true,
                        },
                    },
                },
            },
        },
        skip,
        take,
        orderBy,
    });
    return {
        message: "Applications fetched successfully",
        applications,
        totalApplications,
        totalPages: Math.ceil(totalApplications / limit),
        currentPage: page,
    };
});
exports.getUserApplications = getUserApplications;
function getCompanyApplicationsService(_a) {
    return __awaiter(this, arguments, void 0, function* ({ jobId, companyId, status, userFirstName, usereducation, expectedSalary, age, sortBy, sortOrder, page, limit, }) {
        const filter = {
            jobId,
            job: {
                companyId,
            },
            user: {},
        };
        if (status &&
            Object.values(prisma_1.ApplicationStatus).includes(status)) {
            filter.status = status;
        }
        else if (status) {
            throw new Error(`Invalid status value: ${status}`);
        }
        if (expectedSalary) {
            filter.expectedSalary = {
                lte: expectedSalary,
            };
        }
        if (userFirstName || usereducation || age !== undefined) {
            filter.user = {};
            if (userFirstName) {
                filter.user.firstName = {
                    contains: userFirstName,
                    mode: "insensitive",
                };
            }
            if (usereducation) {
                filter.user.education = {
                    contains: usereducation,
                    mode: "insensitive",
                };
            }
            if (age !== undefined) {
                const today = new Date();
                const minAllowedDob = new Date(today);
                minAllowedDob.setFullYear(minAllowedDob.getFullYear() - age - 1);
                minAllowedDob.setDate(minAllowedDob.getDate() + 1);
                filter.user.dob = {
                    gte: minAllowedDob.toISOString().split("T")[0],
                };
            }
        }
        const skip = (page - 1) * limit;
        const [applications, total] = yield Promise.all([
            prisma_2.default.application.findMany({
                where: filter,
                include: {
                    user: {
                        include: {
                            userTest: {
                                where: {
                                    jobId,
                                },
                                select: {
                                    id: true,
                                    correctAnswers: true,
                                    totalQuestions: true,
                                    scorePercentage: true,
                                    completedAt: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    [sortBy !== null && sortBy !== void 0 ? sortBy : "createdAt"]: sortOrder !== null && sortOrder !== void 0 ? sortOrder : "asc",
                },
                skip,
                take: limit,
            }),
            prisma_2.default.application.count({
                where: filter,
            }),
        ]);
        return { applications, total };
    });
}
