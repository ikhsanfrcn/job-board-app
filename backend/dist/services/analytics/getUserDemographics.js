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
exports.default = getUserDemographics;
const analyticsHelper_1 = require("../../helpers/analyticsHelper");
const prisma_1 = __importDefault(require("../../prisma"));
function getUserDemographics() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma_1.default.user.findMany({
            where: { isVerify: true },
            select: {
                gender: true,
                dob: true,
                city: true
            }
        });
        // Gender distribution
        const genderDistribution = {
            Male: 0,
            Female: 0,
            PreferNotToSay: 0,
        };
        const ageDistribution = {
            under_20: 0,
            "20_29": 0,
            "30_39": 0,
            "40_above": 0,
        };
        const cityCount = {};
        for (const user of users) {
            genderDistribution[user.gender || "PreferNotToSay"]++;
            if (user.dob) {
                const ageGroup = (0, analyticsHelper_1.calculateAgeGroup)(user.dob);
                ageDistribution[ageGroup]++;
            }
            if (user.city) {
                cityCount[user.city] = (cityCount[user.city] || 0) + 1;
            }
        }
        const topLocations = Object.entries(cityCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([city, count]) => ({ city, count }));
        return {
            totalUsers: users.length,
            genderDistribution,
            ageDistribution,
            topLocations,
        };
    });
}
