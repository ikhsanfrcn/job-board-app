import { Request, Response } from "express";
import prisma from "../prisma";

export class ReviewController {
  async createReview(req: Request, res: Response) {
    const userId = req.user?.id;
    const { id: companyId } = req.params;
    const {
      rating,
      isCurrentEmployee,
      employmentStatus,
      jobTitle,
      headline,
      pros,
      cons,
      advice,
    } = req.body;

    if (!userId) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }

    try {
      const result = await prisma.$transaction(async (tx) => {
        const existingReview = await tx.review.findFirst({
          where: {
            userId,
            companyId,
          },
        });

        if (existingReview) {
          throw { message: "You have already reviewed this company." };
        }
        const review = await tx.review.create({
          data: {
            userId,
            companyId,
            rating,
            isCurrentEmployee,
            employmentStatus,
            jobTitle,
            headline,
            pros,
            cons,
            advice,
          },
        });
        return review;
      });
      res.status(201).send({
        message: "Review created successfully✅",
        result,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  //   async getCompanyReviews(req: Request, res: Response) {
  //     const { id: companyId } = req.params;
  //     try {
  //       const reviews = await prisma.review.findMany({ where: { companyId } });
  //       res.status(200).send({ message: "Reviews fetched successfully✅", reviews });
  //     } catch (err) {
  //       console.log(err);
  //       res.status(404).send(err);
  //     }
  //   }
}
