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
exports.registerCompany = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const password_1 = require("../../utils/password");
const token_1 = require("../../utils/token");
const mailer_1 = require("../../utils/mailer");
const companyHelpers_1 = require("../../helpers/companyHelpers");
const linkBuilder_1 = require("../../helpers/linkBuilder");
const registerCompany = (params) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, companyHelpers_1.ensureCompanyNotExists)(params.email);
    const hashed = yield (0, password_1.hashPassword)(params.password);
    const company = yield prisma_1.default.company.create({
        data: Object.assign(Object.assign({}, params), { password: hashed }),
    });
    const token = (0, token_1.generateToken)({ id: company.id, role: "Admin" });
    yield (0, mailer_1.sendVerificationEmail)({
        email: params.email,
        subject: "Company Registration Verification",
        templateName: "verifyCompany",
        templateData: {
            name: params.name,
            link: (0, linkBuilder_1.buildVerificationLinkCompany)(token),
        },
    });
    return { message: "Company registered", company, token };
});
exports.registerCompany = registerCompany;
