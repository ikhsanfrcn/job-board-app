import { Request, Response } from "express";
import { handleInvoiceStatusUpdate } from "../services/transaction/invoiceUpdate";
import { createSubscriber } from "../services/subscriber/createSubs";
import { getSubscriberById } from "../services/subscriber/getSubsById";
import { getSubscriberByUser } from "../services/subscriber/getSubsByUser";
import { cancelPayment } from "../services/transaction/canclePayment";
import { sendSubscriptionRenewalReminders } from "../services/subscriber/reminder";
import { checkAndExpireSubscribers } from "../services/subscriber/checkExpired";

export class SubscriberController {
  async createSubscriber(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { type } = req.body;

      if (!userId) throw { status: 400, message: "Unauthorized" };

      if (!type) throw { status: 400, message: "`type` field is required" };

      const result = await createSubscriber({ userId, type });

      res.status(201).json({
        message: "Subscriber created",
        result,
      });
    } catch (error: any) {
      console.log(error);

      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getSubscriberById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const subscriber = await getSubscriberById(id);

      if (!subscriber)
        throw {
          status: 400,
          message: "Subscriber not found",
        };

      res.json(subscriber);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getSubscriberByUser(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) throw { status: 400, message: "Unauthorized" };

      const subscriber = await getSubscriberByUser(userId);
      res.status(200).json(subscriber);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async cancelPayment(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const result = await cancelPayment(id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async sendReminder(req: Request, res: Response) {
    try {
      const result = await sendSubscriptionRenewalReminders();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async checkExpire(req: Request, res: Response) {
    try {
      const result = await checkAndExpireSubscribers();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
