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
exports.handleInvoiceStatusUpdate = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const handleInvoiceStatusUpdate = (status, externalId) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield prisma_1.default.transaction.findUnique({
        where: { id: externalId },
    });
    if (!transaction) {
        throw `Transaction not found for ID: ${externalId}`;
    }
    if (status === "PAID") {
        const now = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);
        yield prisma_1.default.transaction.update({
            where: { id: externalId },
            data: {
                status: "PAID",
            },
        });
        yield prisma_1.default.subscriber.update({
            where: { userId: transaction.userId },
            data: {
                status: "ACTIVE",
                startDate: now,
                endDate,
                transactionId: transaction.id,
            },
        });
    }
    else if (status === "EXPIRED") {
        yield prisma_1.default.transaction.update({
            where: { id: externalId },
            data: { status: "EXPIRED" },
        });
    }
});
exports.handleInvoiceStatusUpdate = handleInvoiceStatusUpdate;
