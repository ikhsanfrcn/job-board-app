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
exports.default = updateAvatar;
const prisma_1 = __importDefault(require("../../prisma"));
const cloudinary_1 = require("../../helpers/cloudinary");
function updateAvatar(userId, file) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!file)
            throw { message: "avatar is required" };
        const { secure_url } = yield (0, cloudinary_1.cloudinaryUpload)(file, "jobsdoors", "image");
        yield prisma_1.default.user.update({
            where: { id: userId },
            data: { avatar: secure_url },
        });
        return secure_url;
    });
}
