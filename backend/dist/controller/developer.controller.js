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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeveloperController = void 0;
const registerDeveloper_1 = require("../services/auth/registerDeveloper");
const authValidation_1 = require("../validation/authValidation");
const loginDeveloper_1 = require("../services/auth/loginDeveloper");
class DeveloperController {
    registerDeveloper(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = yield authValidation_1.registerDevSchema.validate(req.body, {
                    abortEarly: false,
                    stripUnknown: true,
                });
                const dev = yield (0, registerDeveloper_1.registerDeveloper)(validatedData);
                res.status(201).json(dev);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    loginDeveloper(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield (0, loginDeveloper_1.loginDeveloper)(email, password);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
}
exports.DeveloperController = DeveloperController;
