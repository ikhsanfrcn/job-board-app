import { Request, Response } from "express";
import prisma from "../prisma";
import { cloudinaryUpload } from "../helpers/cloudinary";

export class UserController {
  async getUserProfile(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user?.id },
        select: {
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          gender: true,
          dob: true,
          education: true,
          country: true,
          state: true,
          city: true,
          zipCode: true,
          regionNumber: true,
          phoneNumber: true,
          avatar: true,
        },
      });
      res.status(200).send({
        message: "User fetched successfully✅",
        user,
      });
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
      }
      const {
        username,
        firstName,
        lastName,
        gender,
        dob,
        education,
        country,
        state,
        city,
        zipCode,
        regionNumber,
        phoneNumber,
      } = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          username,
          firstName,
          lastName,
          gender,
          dob,
          education,
          country,
          state,
          city,
          zipCode,
          regionNumber,
          phoneNumber,
        },
      });
      res.status(200).send({
        message: "User updated successfully✅",
        user: updatedUser,
      });
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  }

  async updateAvatar(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!req.file) throw { message: "avatar is required" };
      const { secure_url } = await cloudinaryUpload(req.file, "jobsdoors");

      await prisma.user.update({
        where: { id: userId },
        data: {
          avatar: secure_url,
        },
      });
      res
        .status(200)
        .send({ message: "Avatar updated successfully ✅", secure_url });
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  }
}
