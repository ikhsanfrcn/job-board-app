"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildVerificationLinkCompany = exports.buildCompanyResetPasswordLink = exports.buildResetPasswordLink = exports.buildVerificationLinkUser = void 0;
const buildVerificationLinkUser = (token) => {
    return `${process.env.BASE_URL_FRONTEND}/verify/user/${token}`;
};
exports.buildVerificationLinkUser = buildVerificationLinkUser;
const buildResetPasswordLink = (token) => {
    return `${process.env.BASE_URL_FRONTEND}/password/reset/${token}`;
};
exports.buildResetPasswordLink = buildResetPasswordLink;
const buildCompanyResetPasswordLink = (token) => {
    return `${process.env.BASE_URL_FRONTEND}/company/password/reset/${token}`;
};
exports.buildCompanyResetPasswordLink = buildCompanyResetPasswordLink;
const buildVerificationLinkCompany = (token) => {
    return `${process.env.BASE_URL_FRONTEND}/verify/company/${token}`;
};
exports.buildVerificationLinkCompany = buildVerificationLinkCompany;
