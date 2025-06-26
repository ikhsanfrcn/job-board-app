import { cloudinaryUpload } from "../../helpers/cloudinary";
import prisma from "../../prisma";

export const updateCompanyLogoService = async (companyId: string, file: Express.Multer.File) => {
  if (!file) throw { message: "Logo is required" };

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.mimetype)) throw { message: "Only .jpg, .jpeg, and .png files are allowed" };

  const maxSize = 1 * 1024 * 1024;
  if (file.size > maxSize) throw { message: "File size must be less than 1MB" };

  const { secure_url } = await cloudinaryUpload(file, "jobsdoors", "image");

  await prisma.company.update({
    where: { id: companyId },
    data: { logo: secure_url, },
  });

  return secure_url;
};
