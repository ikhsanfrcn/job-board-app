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
exports.CompanyController = void 0;
const registerCompany_1 = require("../services/company/registerCompany");
const loginCompany_1 = require("../services/company/loginCompany");
const verifyCompany_1 = require("../services/company/verifyCompany");
const requestReset_1 = require("../services/company/requestReset");
const passwordReset_1 = require("../services/company/passwordReset");
const authValidation_1 = require("../validation/authValidation");
const profile_1 = require("../services/company/profile");
const companyValidation_1 = require("../validation/companyValidation");
const updateProfile_1 = __importDefault(require("../services/company/updateProfile"));
const getAllCompany_1 = require("../services/company/getAllCompany");
const getCompanyDetail_1 = require("../services/company/getCompanyDetail");
const updateLogo_1 = require("../services/company/updateLogo");
const getCompanyJobs_1 = require("../services/company/getCompanyJobs");
class CompanyController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validateData = yield authValidation_1.registerCompanySchema.validate(req.body, {
                    abortEarly: false,
                    stripUnknown: true,
                });
                const result = yield (0, registerCompany_1.registerCompany)(validateData);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                console.log((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                const result = yield (0, verifyCompany_1.verifyCompanyAccount)((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield (0, loginCompany_1.loginCompany)(email, password);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    requestPasswordReset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const result = yield (0, requestReset_1.requestPasswordReset)(email);
                res.status(200).json(result);
            }
            catch (error) {
                res
                    .status(error.status || 500)
                    .json({ message: error.message || "Internal server error" });
            }
        });
    }
    passwordReset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers.authorization;
                const { newPassword } = req.body;
                if (!authHeader || !authHeader.startsWith("Bearer ")) {
                    res
                        .status(400)
                        .json({ message: "Authorization token is missing or invalid" });
                    return;
                }
                const token = authHeader.split(" ")[1];
                const result = yield (0, passwordReset_1.passwordReset)(token, newPassword);
                res.status(200).json(result);
            }
            catch (error) {
                res
                    .status(error.status || 500)
                    .json({ message: error.message || "Internal server error" });
            }
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const profile = yield (0, profile_1.getCompanyProfile)((_a = req.company) === null || _a === void 0 ? void 0 : _a.id);
                res.status(200).send({
                    message: "Profile fetched successfully",
                    profile,
                });
            }
            catch (error) {
                res
                    .status(error.status || 500)
                    .json({ message: error.message || "Internal server error" });
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const companyId = (_a = req.company) === null || _a === void 0 ? void 0 : _a.id;
                if (!companyId)
                    throw { statusCode: 400, message: "Unauthorized" };
                const validatedData = yield companyValidation_1.updateProfileSchema.validate(req.body, {
                    abortEarly: false,
                    stripUnknown: true,
                });
                const updated = yield (0, updateProfile_1.default)(companyId, validatedData);
                res.status(200).json({
                    message: "Profile updated successfully",
                    data: updated,
                });
            }
            catch (error) {
                res
                    .status(error.status || 500)
                    .json({ message: error.message || "Internal server error" });
            }
        });
    }
    getAllCompanies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, city, industryId } = req.query;
                const companies = yield (0, getAllCompany_1.getAllCompaniesService)({
                    name: name,
                    city: city,
                    industryId: industryId,
                });
                res.status(200).send({
                    message: "Companies fetched successfully",
                    data: companies,
                });
            }
            catch (error) {
                res
                    .status(error.status || 500)
                    .json({ message: error.message || "Internal server error" });
            }
        });
    }
    getCompanyDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: companyId } = req.params;
                const company = yield (0, getCompanyDetail_1.getCompanyDetailService)(companyId);
                if (!company) {
                    res.status(404).send({ message: "Company not found" });
                    return;
                }
                res.status(200).send({
                    message: "Company fetched successfully",
                    data: company,
                });
            }
            catch (error) {
                res
                    .status(error.status || 500)
                    .json({ message: error.message || "Internal server error" });
            }
        });
    }
    updateLogo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const companyId = (_a = req.company) === null || _a === void 0 ? void 0 : _a.id;
                if (!companyId) {
                    res.status(400).send({ message: "Unauthorized" });
                    return;
                }
                const secure_url = yield (0, updateLogo_1.updateCompanyLogoService)(companyId, req.file);
                res
                    .status(200)
                    .send({ message: "Logo updated successfully", secure_url });
            }
            catch (error) {
                res
                    .status(error.status || 500)
                    .json({ message: error.message || "Internal server error" });
            }
        });
    }
    getCompanyJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: companyId } = req.params;
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const result = yield (0, getCompanyJobs_1.getCompanyJobsService)({ companyId, page, limit });
                res.status(200).send({
                    message: "Jobs fetched successfully",
                    jobs: result.jobs,
                    pagination: result.pagination,
                });
            }
            catch (error) {
                res
                    .status(error.status || 500)
                    .json({ message: error.message || "Internal server error" });
            }
        });
    }
}
exports.CompanyController = CompanyController;
