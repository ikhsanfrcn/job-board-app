import { Request, Response } from "express";
import { createSubscription } from "../services/subscription/createSubscription";
import { getSubscription } from "../services/subscription/getSubscription";
import { subscriptionSchema } from "../validation/subscriptionValidation";
import { updateSubscription } from "../services/subscription/updateSubscription";
import { deleteSubscription } from "../services/subscription/deleteSusbcription";

export class SubscriptionController {
  async createSubscription(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const validatedData = await subscriptionSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      if (!userId) throw { status: 400, message: "Unauthorized" };
      const result = await createSubscription(userId, validatedData);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.message || 500).json({ message: error.message });
    }
  }
  async getSubscription(req: Request, res: Response) {
    try {
      const subscriptions = await getSubscription();
      res.status(200).json(subscriptions);
    } catch (error: any) {
      res.status(error.message || 500).json({ message: error.message });
    }
  }
  async updateSubscription(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) throw { status: 400, message: "Unauthorized" };

      const { id } = req.params;
      const validatedData = await subscriptionSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const result = await updateSubscription(id, validatedData);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.name === "ValidationError") {
        res.status(400).json({
          message: "Validation failed",
          errors: error.errors,
        });
        return;
      }

      res.status(error.status || 500).json({ message: error.message });
    }
  }
  async deleteSubscription(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { id } = req.params;
      if (!userId) throw { status: 400, message: "Unauthorized" };

      const job = await deleteSubscription(id);
      res.status(200).json(job);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}
