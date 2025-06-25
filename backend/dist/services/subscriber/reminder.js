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
exports.sendSubscriptionRenewalReminders = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const mailer_1 = require("../../utils/mailer");
const xendit_1 = __importDefault(require("../../helpers/xendit"));
const sendSubscriptionRenewalReminders = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startOfTomorrow = new Date(tomorrow);
    startOfTomorrow.setHours(0, 0, 0, 0);
    const endOfTomorrow = new Date(tomorrow);
    endOfTomorrow.setHours(23, 59, 59, 999);
    const subscribers = yield prisma_1.default.subscriber.findMany({
        where: {
            status: "ACTIVE",
            endDate: {
                gte: startOfTomorrow,
                lte: endOfTomorrow,
            },
        },
        include: {
            user: true,
        },
    });
    for (const subscriber of subscribers) {
        const user = subscriber.user;
        if (!(user === null || user === void 0 ? void 0 : user.email))
            continue;
        try {
            const subscriptionPlan = yield prisma_1.default.subscription.findFirst({
                where: {
                    type: subscriber.type,
                },
            });
            if (!subscriptionPlan) {
                console.warn(`Subscription type '${subscriber.type}' not found for user ${user.id}`);
                continue;
            }
            const { price: amount, type } = subscriptionPlan;
            const now = new Date();
            const endDate = subscriber.endDate;
            const diffMs = endDate.getTime() - now.getTime();
            const invoiceDuration = Math.floor(diffMs / 1000);
            const transaction = yield prisma_1.default.transaction.create({
                data: {
                    userId: subscriber.userId,
                    type,
                    amount,
                    status: "PENDING",
                    createdAt: now,
                    expiredAt: endDate,
                },
            });
            const invoice = yield xendit_1.default.Invoice.createInvoice({
                data: {
                    amount,
                    invoiceDuration,
                    externalId: transaction.id,
                    description: `Renewal subscription ${subscriptionPlan.name}`,
                    currency: "IDR",
                    reminderTime: 1,
                },
            });
            const data = yield prisma_1.default.transaction.update({
                where: { id: transaction.id },
                data: { invoiceUrl: invoice.invoiceUrl },
            });
            yield (0, mailer_1.sendReminderEmail)({
                email: user.email,
                subject: "Your Subscription Renewal",
                templateName: "subscriptionRenewal",
                templateData: {
                    heading: "Subscription Renewal Reminder",
                    name: user.firstName || user.username,
                    plan: subscriptionPlan.name,
                    date: (_a = subscriber.endDate) === null || _a === void 0 ? void 0 : _a.toLocaleDateString(),
                    paymentUrl: invoice.invoiceUrl
                },
            });
        }
        catch (error) {
            console.error(`Failed to send reminder for user ${user.id}:`, error);
        }
    }
    return {
        message: "Subscription renewal reminders sent",
        count: subscribers.length,
    };
});
exports.sendSubscriptionRenewalReminders = sendSubscriptionRenewalReminders;
