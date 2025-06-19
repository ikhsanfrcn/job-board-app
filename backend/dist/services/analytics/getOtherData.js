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
exports.default = getOtherData;
const prisma_1 = __importDefault(require("../../prisma"));
function getOtherData() {
    return __awaiter(this, void 0, void 0, function* () {
        const activeSubscribers = yield prisma_1.default.subscriber.count({
            where: { status: "ACTIVE" },
        });
        const totalUsers = yield prisma_1.default.user.count({});
        const totalCompanies = yield prisma_1.default.company.count();
        const totalPublishedJobs = yield prisma_1.default.job.count({
            where: { isPublished: true },
        });
        return {
            activeSubscribers,
            userRoleDistribution: [
                {
                    role: "user",
                    count: totalUsers,
                },
                {
                    role: "company",
                    count: totalCompanies,
                },
            ],
            totalPublishedJobs,
        };
    });
}
