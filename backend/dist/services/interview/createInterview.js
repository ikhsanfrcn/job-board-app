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
exports.createInterview = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const mailer_1 = require("../../utils/mailer");
const createInterview = (params) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const interview = yield prisma_1.default.interview.create({
        data: Object.assign({}, params),
    });
    yield prisma_1.default.application.update({
        where: { id: params.applicationId },
        data: { status: "INTERVIEW" },
    });
    const application = yield prisma_1.default.application.findUnique({
        where: { id: params.applicationId },
        include: {
            user: true,
            job: {
                include: {
                    company: true,
                },
            },
        },
    });
    const user = application === null || application === void 0 ? void 0 : application.user;
    const companyName = ((_a = application === null || application === void 0 ? void 0 : application.job) === null || _a === void 0 ? void 0 : _a.company.name) || "the company";
    if (user === null || user === void 0 ? void 0 : user.email) {
        yield (0, mailer_1.sendReminderEmail)({
            email: user.email,
            subject: "Interview Scheduled",
            templateName: "interviewNotice",
            templateData: {
                heading: "Interview Scheduled",
                name: user.firstName || "there",
                message: `You have successfully scheduled an interview with ${companyName}.`,
                date: interview.date,
                time: interview.time,
                location: interview.location,
            },
        });
    }
    return { message: "Interview created and email sent", interview };
});
exports.createInterview = createInterview;
