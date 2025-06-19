import prisma from "../../prisma";
import { cloudinaryUpload } from "../../helpers/cloudinary";

export default async function updateAvatar(userId?: string, file?: Express.Multer.File) {
  if (!file) throw { message: "avatar is required" };
  const { secure_url } = await cloudinaryUpload(file, "jobsdoors", "image");

  await prisma.user.update({
    where: { id: userId },
    data: { avatar: secure_url },
  });

  return secure_url;
}
