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
exports.default = getAnalyticsSummary;
const getUserDemographics_1 = __importDefault(require("./getUserDemographics"));
const getSalaryTrends_1 = __importDefault(require("./getSalaryTrends"));
const getApplicantInterests_1 = __importDefault(require("./getApplicantInterests"));
const getOtherData_1 = __importDefault(require("./getOtherData"));
function getAnalyticsSummary() {
    return __awaiter(this, void 0, void 0, function* () {
        const [userDemographics, salaryTrends, applicantInterests, otherData] = yield Promise.all([
            (0, getUserDemographics_1.default)(),
            (0, getSalaryTrends_1.default)(),
            (0, getApplicantInterests_1.default)(),
            (0, getOtherData_1.default)(),
        ]);
        return {
            userDemographics,
            salaryTrends,
            applicantInterests,
            otherData,
        };
    });
}
