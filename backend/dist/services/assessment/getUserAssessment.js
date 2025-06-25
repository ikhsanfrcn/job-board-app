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
exports.getUserAssessments = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getUserAssessments = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, title, isPassed, sortBy = "createdAt", sortOrder = "asc", page = 1, limit = 10, }) {
    const skip = (page - 1) * limit;
    const take = limit;
    const filter = Object.assign(Object.assign({ userId }, (typeof isPassed === "boolean" && { isPassed })), (title && {
        template: {
            title: {
                contains: title,
                mode: "insensitive",
            },
        },
    }));
    const orderBy = (() => {
        if (sortBy === "title") {
            return {
                template: {
                    title: sortOrder,
                },
            };
        }
        return {
            [sortBy]: sortOrder,
        };
    })();
    const assessments = yield prisma_1.default.skillAssessment.findMany({
        where: filter,
        include: {
            template: true,
        },
        orderBy,
        skip,
        take,
    });
    const total = yield prisma_1.default.skillAssessment.count({
        where: filter,
    });
    return {
        message: "User assessments fetched successfully",
        assessments,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
});
exports.getUserAssessments = getUserAssessments;
