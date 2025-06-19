import { cloudinaryUpload } from "../../helpers/cloudinary";
import prisma from "../../prisma";

export const updateCompanyLogoService = async (
  companyId: string,
  file: Express.Multer.File
) => {
  if (!file) {
    throw { message: "Logo is required" };
  }

  const { secure_url } = await cloudinaryUpload(file, "jobsdoors", "image");

  await prisma.company.update({
    where: { id: companyId },
    data: {
      logo: secure_url,
    },
  });

  return secure_url;
};
