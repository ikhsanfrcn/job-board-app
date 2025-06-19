import { Request, Response } from "express";
import prisma from "../prisma";

export class ReviewController {
  async createReview(req: Request, res: Response) {
    const userId = req.user?.id;
    const { id: companyId } = req.params;
    const {
      salaryEstimate,
      cultureRating,
      workLifeBalanceRating,
      facilitiesRating,
      careerOpportunitiesRating,
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
      const existingReview = await prisma.review.findUnique({
        where: {
          userId_companyId: {
            userId,
            companyId,
          },
        },
      });

      if (existingReview) {
        res.status(400).send({
          message: "You have already reviewed this company.",
        });
        return;
      }

      const isAccepted = await prisma.application.findFirst({
        where: {
          userId: userId,
          status: "OFFERED",
          job: {
            companyId: companyId,
          },
        },
      });

      if (!isAccepted) {
        res.status(400).send({
          message: "You have not been accepted for this company.",
        });
        return;
      }

      const review = await prisma.review.create({
        data: {
          userId,
          companyId,
          salaryEstimate,
          cultureRating,
          workLifeBalanceRating,
          facilitiesRating,
          careerOpportunitiesRating,
          employmentStatus,
          jobTitle,
          headline,
          pros,
          cons,
          advice,
        },
      });

      res.status(201).send({
        message: "Review created successfully",
        result: review,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }

  async getCompanyReviews(req: Request, res: Response) {
    const { id: companyId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;

    try {
      const [reviews, totalReviews] = await Promise.all([
        prisma.review.findMany({
          where: { companyId },
          skip,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
        prisma.review.count({
          where: { companyId },
        }),
      ]);

      const reviewsWithAverage = reviews.map((review) => {
        const {
          cultureRating,
          workLifeBalanceRating,
          facilitiesRating,
          careerOpportunitiesRating,
        } = review;

        const averageRating =
          (cultureRating +
            workLifeBalanceRating +
            facilitiesRating +
            careerOpportunitiesRating) /
          4;

        return {
          ...review,
          averageRating: parseFloat(averageRating.toFixed(1)),
        };
      });

      res.status(200).send({
        message: "Reviews fetched successfully",
        reviews: reviewsWithAverage,
        total: totalReviews,
        currentPage: page,
        totalPages: Math.ceil(totalReviews / limit),
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Failed to fetch reviews", error: err });
    }
  }
}
