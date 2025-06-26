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
exports.requestUserEmailChange = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
const mailer_1 = require("../../utils/mailer");
const linkBuilder_1 = require("../../helpers/linkBuilder");
const requestUserEmailChange = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!user)
        throw { status: 400, message: "User not found" };
    if (user.socialLogin) {
        throw {
            status: 400,
            message: "Users who register with social login cannot reset their password with this feature.",
        };
    }
    const token = (0, jsonwebtoken_1.sign)({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    yield (0, mailer_1.sendVerificationEmail)({
        email: user.email,
        subject: "Email Change Verification",
        templateName: "emailChange",
        templateData: {
            name: user.username,
            link: (0, linkBuilder_1.buildChangeEmailLink)(token),
        },
    });
    return { message: "Request sent" };
});
exports.requestUserEmailChange = requestUserEmailChange;
