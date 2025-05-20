export const buildVerificationLinkUser = (token: string) => {
  return `${process.env.BASE_URL_FRONTEND}/verify/user/${token}`;
};

export const buildResetPasswordLink = (token: string) => {
  return `${process.env.BASE_URL_FRONTEND}/password/reset/${token}`;
};

export const buildVerificationLinkCompany = (token: string) => {
  return `${process.env.BASE_URL_FRONTEND}/verify/company/${token}`;
}
