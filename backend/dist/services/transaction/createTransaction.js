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
exports.createTransaction = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const xendit_1 = __importDefault(require("../../helpers/xendit"));
const createTransaction = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, type, amount }) {
    const now = new Date();
    const expiredAt = new Date(now.getTime() + 60 * 60 * 1000); // 1 jam
    return yield prisma_1.default.$transaction((txn) => __awaiter(void 0, void 0, void 0, function* () {
        const existing = yield txn.subscriber.findUnique({ where: { userId } });
        const isActive = (existing === null || existing === void 0 ? void 0 : existing.status) === "ACTIVE" &&
            existing.endDate &&
            existing.endDate > now;
        if (isActive) {
            throw new Error("You still have an active subscriber.");
        }
        const newTransaction = yield txn.transaction.create({
            data: {
                userId,
                type,
                amount,
                status: "PENDING",
                createdAt: now,
                expiredAt,
            },
        });
        const invoice = yield xendit_1.default.Invoice.createInvoice({
            data: {
                amount,
                invoiceDuration: 3600,
                externalId: newTransaction.id,
                description: `Subscription ${type}`,
                currency: "IDR",
                reminderTime: 1,
            },
        });
        yield txn.transaction.update({
            where: { id: newTransaction.id },
            data: { invoiceUrl: invoice.invoiceUrl },
        });
        yield txn.subscriber.update({
            where: { userId },
            data: {
                transactionId: newTransaction.id,
            },
        });
        return { data: newTransaction, invoiceUrl: invoice.invoiceUrl };
    }));
});
exports.createTransaction = createTransaction;
