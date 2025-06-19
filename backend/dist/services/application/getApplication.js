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
const prisma_1 = __importDefault(require("../../prisma"));
const getUserApplications = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, page = 1, pageSize = 10, }) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const totalApplications = yield prisma_1.default.application.count({
        where: { userId },
    });
    const applications = yield prisma_1.default.application.findMany({
        where: { userId },
        include: { job: true },
        skip,
        take,
    });
    return {
        message: "Applications fetched successfully",
        applications,
        totalApplications,
        totalPages: Math.ceil(totalApplications / pageSize),
        currentPage: page,
    };
});
exports.getUserApplications = getUserApplications;
function getCompanyApplicationsService(jobId, companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.default.application.findMany({
            where: {
                jobId,
                job: {
                    companyId: companyId,
                },
            },
            include: {
                user: true,
            },
        });
    });
}
