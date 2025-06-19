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
exports.sendReminderEmail = exports.sendVerificationEmail = void 0;
const transporter_1 = require("../helpers/transporter");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const sendVerificationEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, subject, templateName, templateData, }) {
    const templatePath = path_1.default.join(__dirname, "../templates", `${templateName}.hbs`);
    const source = fs_1.default.readFileSync(templatePath, "utf8");
    const compiled = handlebars_1.default.compile(source);
    const html = compiled(templateData);
    yield transporter_1.transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject,
        html,
    });
});
exports.sendVerificationEmail = sendVerificationEmail;
const sendReminderEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, subject, templateName, templateData, }) {
    const templatePath = path_1.default.join(__dirname, "../templates", `${templateName}.hbs`);
    const source = fs_1.default.readFileSync(templatePath, "utf8");
    const compiled = handlebars_1.default.compile(source);
    const html = compiled(templateData);
    yield transporter_1.transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject,
        html,
    });
});
exports.sendReminderEmail = sendReminderEmail;
