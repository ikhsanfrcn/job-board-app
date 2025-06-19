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
exports.InterviewController = void 0;
const createInterview_1 = require("../services/interview/createInterview");
const interviewValidation_1 = require("../validation/interviewValidation");
const updateInterview_1 = require("../services/interview/updateInterview");
const sendReminder_1 = require("../services/interview/sendReminder");
class InterviewController {
    createInterview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validateData = yield interviewValidation_1.createInterviewSchema.validate(req.body, {
                    abortEarly: false,
                    stripUnknown: true,
                });
                const interview = yield (0, createInterview_1.createInterview)(validateData);
                res.status(200).json(interview);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    updateInterview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, date, location } = req.body;
                const result = yield (0, updateInterview_1.updateInterview)(id, date, location);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    sendInterviewReminders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, sendReminder_1.sendInterviewRemindersService)();
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.InterviewController = InterviewController;
