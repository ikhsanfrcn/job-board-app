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
exports.AnalyticsController = void 0;
const getUserDemographics_1 = __importDefault(require("../services/analytics/getUserDemographics"));
const getSalaryTrends_1 = __importDefault(require("../services/analytics/getSalaryTrends"));
const getApplicantInterests_1 = __importDefault(require("../services/analytics/getApplicantInterests"));
const getAnalyticsSummary_1 = __importDefault(require("../services/analytics/getAnalyticsSummary"));
class AnalyticsController {
    userDemographics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, getUserDemographics_1.default)();
                res.status(200).send({ message: "User demographics fetched", data });
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    salaryTrends(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, getSalaryTrends_1.default)();
                res.status(200).send({ message: "Salary trends fetched", data });
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    applicantInterests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, getApplicantInterests_1.default)();
                res.status(200).send({ message: "Applicant interests fetched", data });
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    summary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, getAnalyticsSummary_1.default)();
                res.status(200).send({ message: "Analytics summary fetched", data });
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
}
exports.AnalyticsController = AnalyticsController;
