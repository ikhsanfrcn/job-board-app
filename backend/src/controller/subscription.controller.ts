import { Request, Response } from "express";
import { createSubscription } from "../services/subscription/createSubscription";
import { handleInvoiceStatusUpdate } from "../services/subscription/invoiceUpdate";
import { getSubscriptionById } from "../services/subscription/getSubsById";

export class SubscriptionController {
  async createSubscription(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { type } = req.body;

      if (!userId) throw { status: 400, message: "Unauthorized" };

      if (!type) throw { status: 400, message: "`type` field is required" };

      const result = await createSubscription({ userId, type });

      res.status(201).json({
        message: "Subscription created",
        result,
      });
    } catch (error: any) {
      console.log(error);

      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async handleWebhook(req: Request, res: Response) {
    try {
      const { status, external_id } = req.body;

      if (!status || !external_id)
        throw {
          status: 400,
          message: "`status and external_id` field is required",
        };

      await handleInvoiceStatusUpdate(status, external_id);

      res.status(200).json({ message: "Success" });
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getSubscriptionById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const subscription = await getSubscriptionById(id);

      if (!subscription) throw {
          status: 400,
          message: "Subscription not found",
        };

      res.json(subscription);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}
