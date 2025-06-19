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
exports.registerUser = void 0;
const authHelpers_1 = require("../../helpers/authHelpers");
const linkBuilder_1 = require("../../helpers/linkBuilder");
const prisma_1 = __importDefault(require("../../prisma"));
const mailer_1 = require("../../utils/mailer");
const password_1 = require("../../utils/password");
const token_1 = require("../../utils/token");
const registerUser = (params) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, authHelpers_1.ensureUserNotExists)(params.email, params.username);
    const hashed = yield (0, password_1.hashPassword)(params.password);
    const user = yield prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, params), { password: hashed }),
    });
    const token = (0, token_1.generateToken)({ id: user.id, role: "User" });
    yield (0, mailer_1.sendVerificationEmail)({
        email: params.email,
        subject: "Verification Email",
        templateName: "verify",
        templateData: {
            name: params.username,
            link: (0, linkBuilder_1.buildVerificationLinkUser)(token),
        },
    });
    return { message: "User registered", user, token };
});
exports.registerUser = registerUser;
