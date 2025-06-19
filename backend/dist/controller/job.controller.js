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
exports.JobController = void 0;
const createJob_1 = require("../services/job/createJob");
const deleteJob_1 = require("../services/job/deleteJob");
const getJobs_1 = require("../services/job/getJobs");
const getJobById_1 = require("../services/job/getJobById");
const getCompanyJob_1 = require("../services/job/getCompanyJob");
const togglePublishJob_1 = require("../services/job/togglePublishJob");
const updateJob_1 = require("../services/job/updateJob");
const jobValidation_1 = require("../validation/jobValidation");
class JobController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const companyId = (_a = req.company) === null || _a === void 0 ? void 0 : _a.id;
                if (!companyId)
                    throw { status: 400, message: "Unauthorized" };
                const validatedData = yield jobValidation_1.createJobSchema.validate(req.body, {
                    abortEarly: false,
                    stripUnknown: true,
                });
                const jobData = Object.assign(Object.assign({}, validatedData), { companyId: companyId, isPublished: (_b = req.body.isPublished) !== null && _b !== void 0 ? _b : false });
                const job = yield (0, createJob_1.createJob)(jobData);
                res.status(200).json(job);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, city, category, tags, isPublished, page = "1", size = "10", minSalary, maxSalary, } = req.query;
                const parsedTags = typeof tags === "string" ? tags.split(",") : [];
                const jobsResult = yield (0, getJobs_1.getJobs)({
                    title: title,
                    city: city,
                    category: category,
                    tags: parsedTags,
                    isPublished: isPublished === "false" ? false : true,
                    page: parseInt(page),
                    size: parseInt(size),
                    minSalary: minSalary ? parseInt(minSalary) : undefined,
                    maxSalary: maxSalary ? parseInt(maxSalary) : undefined,
                });
                res.status(200).json(jobsResult);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield (0, getJobById_1.getJobById)(id);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getCompanyJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const companyId = (_a = req.company) === null || _a === void 0 ? void 0 : _a.id;
                if (!companyId)
                    throw { status: 401, message: "Unauthorized" };
                const { page = "1", size = "10" } = req.query;
                const result = yield (0, getCompanyJob_1.getCompanyJobs)({
                    companyId,
                    page: parseInt(page),
                    size: parseInt(size),
                });
                res.status(200).json(result);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    togglePublish(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const companyId = (_a = req.company) === null || _a === void 0 ? void 0 : _a.id;
                if (!companyId)
                    throw { status: 401, message: "Unauthorized" };
                const { id } = req.params;
                const { isPublished } = req.body;
                if (typeof isPublished !== "boolean") {
                    throw { status: 400, message: "`isPublished` must be a boolean" };
                }
                const result = yield (0, togglePublishJob_1.togglePublishJob)(id, companyId, isPublished);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const companyId = (_a = req.company) === null || _a === void 0 ? void 0 : _a.id;
                if (!companyId)
                    throw { status: 401, message: "Unauthorized" };
                const { id } = req.params;
                const validatedData = yield jobValidation_1.updateJobSchema.validate(req.body, {
                    abortEarly: false,
                    stripUnknown: true,
                });
                const result = yield (0, updateJob_1.updateJob)(id, companyId, validatedData);
                res.status(200).json(result);
            }
            catch (error) {
                if (error.name === "ValidationError") {
                    res.status(400).json({
                        message: "Validation failed",
                        errors: error.errors,
                    });
                    return;
                }
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const companyId = (_a = req.company) === null || _a === void 0 ? void 0 : _a.id;
                if (!companyId)
                    throw { status: 400, message: "Unauthorized" };
                const { id } = req.params;
                const job = yield (0, deleteJob_1.deleteJob)(id, companyId);
                res.status(200).json(job);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
}
exports.JobController = JobController;
