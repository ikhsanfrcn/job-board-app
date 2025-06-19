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
exports.createSubscriber = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const createSubscriber = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, type, }) {
    const now = new Date();
    return yield prisma_1.default.$transaction((txn) => __awaiter(void 0, void 0, void 0, function* () {
        const existing = yield txn.subscriber.findUnique({ where: { userId } });
        if (existing) {
            const now = new Date();
            const isActive = existing.status === 'ACTIVE' && existing.endDate && existing.endDate > now;
            if (isActive) {
                throw new Error('You still have an active subscriber.');
            }
            const updatedSub = yield txn.subscriber.update({
                where: { userId },
                data: {
                    type,
                    status: 'PENDING',
                    startDate: null,
                    endDate: null,
                },
            });
            return { data: updatedSub };
        }
        const newSub = yield txn.subscriber.create({
            data: {
                userId,
                type,
                status: 'PENDING',
                createdAt: now,
            },
        });
        return { data: newSub };
    }));
});
exports.createSubscriber = createSubscriber;
