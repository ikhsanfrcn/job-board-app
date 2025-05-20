import prisma from "../prisma";


export const ensureCompanyNotExists = async (email: string) => {
  if (await prisma.company.findUnique({ where: { email } }))
    throw { status: 400, message: "Email already registered" };
};

export const buildVerificationLink = (id: string) =>
  `${process.env.BASE_URL_FRONTEND}/verify/company/${id}`;
