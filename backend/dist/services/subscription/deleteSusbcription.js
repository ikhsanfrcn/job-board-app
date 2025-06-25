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
exports.deleteSubscription = void 0;
const subscriptionHelper_1 = require("../../helpers/subscriptionHelper");
const prisma_1 = __importDefault(require("../../prisma"));
const deleteSubscription = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const subscription = yield (0, subscriptionHelper_1.ensureSubscriptionExists)(id);
    if (!subscription) {
        throw { status: 400, message: "You are not authorized to delete this job" };
    }
    const deletedJob = yield prisma_1.default.subscription.delete({ where: { id } });
    return { message: "Subscription deleted", deletedJob };
});
exports.deleteSubscription = deleteSubscription;
