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
exports.userChangeEmail = void 0;
const decodeToken_1 = require("../../utils/decodeToken");
const prisma_1 = __importDefault(require("../../prisma"));
const authHelpers_1 = require("../../helpers/authHelpers");
const token_1 = require("../../utils/token");
const mailer_1 = require("../../utils/mailer");
const linkBuilder_1 = require("../../helpers/linkBuilder");
const userChangeEmail = (token, newEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, decodeToken_1.decodeToken)(token);
    const userId = decoded.userId || decoded.id;
    const user = yield (0, authHelpers_1.getUserOrThrow)(userId);
    const tokenIssuedAt = decoded.iat * 1000;
    if (tokenIssuedAt < user.updatedAt.getTime()) {
        throw { status: 400, message: "This reset link is no longer valid" };
    }
    yield prisma_1.default.user.update({
        where: { id: user.id },
        data: { email: newEmail, isVerify: false },
    });
    const newtoken = (0, token_1.generateToken)({ id: user.id, role: "User" });
    yield (0, mailer_1.sendVerificationEmail)({
        email: user.email,
        subject: "Verification Email",
        templateName: "verify",
        templateData: {
            name: user.username,
            link: (0, linkBuilder_1.buildVerificationLinkUser)(newtoken),
        },
    });
    return { message: "Change password success" };
});
exports.userChangeEmail = userChangeEmail;
