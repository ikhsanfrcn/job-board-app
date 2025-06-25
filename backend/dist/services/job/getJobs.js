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
exports.getJobs = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getJobs = (_a) => __awaiter(void 0, [_a], void 0, function* ({ titleOrCategory, city, category, tags, isPublished = true, page = 1, size = 10, minSalary, maxSalary, worksite, date, sort, }) {
    const skip = (page - 1) * size;
    const take = size;
    const where = { isPublished };
    if (titleOrCategory) {
        where.OR = [
            {
                title: {
                    contains: titleOrCategory,
                    mode: "insensitive",
                },
            },
            {
                category: {
                    contains: titleOrCategory,
                    mode: "insensitive",
                },
            },
        ];
    }
    if (city) {
        where.city = {
            contains: city,
            mode: "insensitive",
        };
    }
    if (worksite) {
        where.worksite = worksite;
    }
    if (category)
        where.category = category;
    if (tags && tags.length > 0) {
        where.tags = { hasEvery: tags };
    }
    if (minSalary) {
        where.salaryMin = { gte: minSalary };
    }
    if (maxSalary) {
        where.salaryMax = { lte: maxSalary };
    }
    if (date === "7days") {
        where.createdAt = {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        };
    }
    else if (date === "1month") {
        where.createdAt = {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        };
    }
    let orderBy = { createdAt: "desc" };
    if (sort === "oldest") {
        orderBy = { createdAt: "asc" };
    }
    const [jobs, total] = yield Promise.all([
        prisma_1.default.job.findMany({
            where,
            skip,
            take,
            orderBy,
            include: {
                company: {
                    select: {
                        id: true,
                        name: true,
                        city: true,
                        website: true,
                        logo: true,
                    },
                },
            },
        }),
        prisma_1.default.job.count({ where }),
    ]);
    return {
        message: "Jobs fetched successfully",
        data: {
            jobs,
            pagination: {
                total,
                page,
                size,
                totalPages: Math.ceil(total / size),
            },
        },
    };
});
exports.getJobs = getJobs;
