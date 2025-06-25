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
exports.isSubscribeService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const isSubscribeService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId)
        throw { status: 400, message: "User id is required" };
    const subscribers = yield prisma_1.default.subscriber.findMany({
        where: {
            userId,
            status: "ACTIVE",
            startDate: { not: null },
            endDate: { not: null },
        },
    });
    const now = new Date();
    const activeSubscription = subscribers.find((sub) => {
        return (sub.startDate && sub.endDate && now >= sub.startDate && now <= sub.endDate);
    });
    if (activeSubscription) {
        return {
            isValid: true,
            activeSubscription: {
                startDate: activeSubscription.startDate,
                endDate: activeSubscription.endDate,
                type: activeSubscription.type,
            },
        };
    }
    return { isValid: false };
});
exports.isSubscribeService = isSubscribeService;
