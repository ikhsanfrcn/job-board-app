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
exports.checkAndExpireSubscribers = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const checkAndExpireSubscribers = () => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const expiredSubscribers = yield prisma_1.default.subscriber.findMany({
        where: {
            status: "ACTIVE",
            endDate: {
                lt: now,
            },
        },
    });
    if (expiredSubscribers.length === 0) {
        console.log("[EXPIRE CHECK] There are no expired subscriptions.");
        return { count: 0 };
    }
    const ids = expiredSubscribers.map((s) => s.id);
    yield prisma_1.default.subscriber.updateMany({
        where: {
            id: { in: ids },
        },
        data: {
            status: "EXPIRED",
        },
    });
    console.log(`[EXPIRE CHECK] ${ids.length} Subscription status changed to EXPIRED.`);
    return { count: ids.length };
});
exports.checkAndExpireSubscribers = checkAndExpireSubscribers;
