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
const prisma_1 = __importDefault(require("../../prisma"));
const authHelpers_1 = require("../../helpers/authHelpers");
const userChangeEmail = (userId, newEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, authHelpers_1.getUserOrThrow)(userId);
    yield prisma_1.default.user.update({
        where: { id: user.id },
        data: { email: newEmail },
    });
    return { message: "Change password success" };
});
exports.userChangeEmail = userChangeEmail;
