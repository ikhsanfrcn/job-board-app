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
exports.getCompanyJobs = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getCompanyJobs = (_a) => __awaiter(void 0, [_a], void 0, function* ({ companyId, title, category, sortBy = "createdAt", sortOrder = "desc", page = 1, size = 10, }) {
    const skip = (page - 1) * size;
    const take = size;
    // Filter
    const filters = Object.assign(Object.assign({ companyId, isDeleted: false }, (title && {
        title: {
            contains: title,
            mode: "insensitive",
        },
    })), (category && {
        category: {
            contains: category,
            mode: "insensitive",
        },
    }));
    // Sort (gunakan array agar lebih aman terhadap Prisma)
    const orderBy = [
        { [sortBy]: sortOrder },
    ];
    const [jobs, total] = yield Promise.all([
        prisma_1.default.job.findMany({
            where: filters,
            skip,
            take,
            orderBy,
        }),
        prisma_1.default.job.count({
            where: filters,
        }),
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
exports.getCompanyJobs = getCompanyJobs;
