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
const node_cron_1 = __importDefault(require("node-cron"));
const sendReminder_1 = require("../services/interview/sendReminder");
const reminder_1 = require("../services/subscriber/reminder");
const checkExpired_1 = require("../services/subscriber/checkExpired");
// Kirim reminder otomatis setiap hari jam 08:00
node_cron_1.default.schedule("0 8 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running daily reminder...");
    yield (0, sendReminder_1.sendInterviewRemindersService)();
    yield (0, reminder_1.sendSubscriptionRenewalReminders)();
}));
node_cron_1.default.schedule("0 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, checkExpired_1.checkAndExpireSubscribers)();
}));
