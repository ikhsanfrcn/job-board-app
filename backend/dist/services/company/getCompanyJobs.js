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
exports.getCompanyJobsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getCompanyJobsService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ companyId, page = 1, limit = 10, }) {
    const skip = (page - 1) * limit;
    const [jobs, total] = yield Promise.all([
        prisma_1.default.job.findMany({
            where: { companyId },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        }),
        prisma_1.default.job.count({
            where: { companyId },
        }),
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
        jobs,
        pagination: {
            total,
            totalPages,
            currentPage: page,
            perPage: limit,
        },
    };
});
exports.getCompanyJobsService = getCompanyJobsService;
