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
exports.default = getSalaryTrends;
const prisma_1 = __importDefault(require("../../prisma"));
function getSalaryTrends() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const applications = yield prisma_1.default.application.findMany({
            where: {
                expectedSalary: {
                    not: null,
                },
            },
            select: {
                expectedSalary: true,
                job: {
                    select: {
                        title: true,
                        city: true,
                        category: true,
                    },
                },
            },
        });
        const salaryMap = new Map();
        for (const app of applications) {
            if (!app.expectedSalary || !app.job)
                continue;
            const key = `${app.job.title} | ${app.job.city}`;
            const salary = parseInt(app.expectedSalary);
            if (isNaN(salary))
                continue;
            if (!salaryMap.has(key)) {
                salaryMap.set(key, []);
            }
            (_a = salaryMap.get(key)) === null || _a === void 0 ? void 0 : _a.push(salary);
        }
        const averageSalaries = Array.from(salaryMap.entries()).map(([key, salaries]) => {
            const [title, city] = key.split(" | ");
            const avg = salaries.reduce((sum, s) => sum + s, 0) / salaries.length;
            return {
                jobTitle: title,
                city,
                averageSalary: Math.round(avg),
                sampleCount: salaries.length,
            };
        });
        return averageSalaries.sort((a, b) => b.sampleCount - a.sampleCount).slice(0, 10);
    });
}
