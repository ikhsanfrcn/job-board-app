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
exports.sendInterviewRemindersService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const mailer_1 = require("../../utils/mailer");
const sendInterviewRemindersService = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDateOnly = tomorrow.toISOString().split("T")[0]; // Format: "YYYY-MM-DD"
    const interviews = yield prisma_1.default.interview.findMany({
        where: {
            date: tomorrowDateOnly,
        },
        include: {
            application: {
                include: {
                    user: true,
                    job: {
                        include: {
                            company: true,
                        },
                    },
                },
            },
        },
    });
    for (const interview of interviews) {
        const user = (_a = interview.application) === null || _a === void 0 ? void 0 : _a.user;
        const companyName = ((_c = (_b = interview.application) === null || _b === void 0 ? void 0 : _b.job) === null || _c === void 0 ? void 0 : _c.company.name) || "the company";
        if (user === null || user === void 0 ? void 0 : user.email) {
            yield (0, mailer_1.sendReminderEmail)({
                email: user.email,
                subject: "Interview Reminder",
                templateName: "interviewNotice",
                templateData: {
                    heading: "Interview Reminder",
                    name: user.firstName || "there",
                    message: `This is a reminder that you have an upcoming interview scheduled with ${companyName}.`,
                    date: interview.date,
                    time: interview.time,
                    location: interview.location,
                },
            });
        }
    }
    return { message: "Reminders sent", count: interviews.length };
});
exports.sendInterviewRemindersService = sendInterviewRemindersService;
