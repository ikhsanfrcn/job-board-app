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
exports.loginUser = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const password_1 = require("../../utils/password");
const token_1 = require("../../utils/token");
const mailer_1 = require("../../utils/mailer");
const linkBuilder_1 = require("../../helpers/linkBuilder");
const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({ where: { username } });
    if (!user)
        throw { status: 404, message: "User not found" };
    const valid = yield (0, password_1.comparePassword)(password, user.password);
    if (!valid)
        throw { status: 401, message: "Invalid password" };
    if (!user.isVerify) {
        const now = new Date();
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
        if (user.verificationSent < oneHourAgo) {
            const token = (0, token_1.generateToken)({ id: user.id, role: "User" });
            yield (0, mailer_1.sendVerificationEmail)({
                email: user.email,
                subject: "Verification Email",
                templateName: "verify",
                templateData: {
                    name: user.username,
                    link: (0, linkBuilder_1.buildVerificationLinkUser)(token),
                },
            });
            yield prisma_1.default.user.update({
                where: { id: user.id },
                data: { verificationSent: now },
            });
            throw {
                status: 403,
                message: "Account not verified. Verification email resent.",
            };
        }
        throw {
            status: 403,
            message: "Account not verified. Please check your email.",
        };
    }
    const token = (0, token_1.generateToken)({ id: user.id, role: user.role });
    return { message: "Login successful", data: user, access_token: token };
});
exports.loginUser = loginUser;
