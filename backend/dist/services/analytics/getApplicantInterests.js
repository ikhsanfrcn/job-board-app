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
exports.default = getApplicantInterests;
const prisma_1 = __importDefault(require("../../prisma"));
function getApplicantInterests() {
    return __awaiter(this, void 0, void 0, function* () {
        const applications = yield prisma_1.default.application.findMany({
            select: {
                job: {
                    select: {
                        id: true,
                        title: true,
                        category: true,
                    },
                },
            },
        });
        const categoryCount = {};
        const jobTitleCount = {};
        for (const app of applications) {
            const job = app.job;
            if (!job)
                continue;
            if (job.category) {
                categoryCount[job.category] = (categoryCount[job.category] || 0) + 1;
            }
            if (job.title) {
                jobTitleCount[job.title] = (jobTitleCount[job.title] || 0) + 1;
            }
        }
        const topCategories = Object.entries(categoryCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([category, count]) => ({ category, count }));
        const topJobs = Object.entries(jobTitleCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([title, count]) => ({ title, count }));
        return {
            totalApplications: applications.length,
            topCategories,
            topJobs,
        };
    });
}
