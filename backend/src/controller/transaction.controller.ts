import { Request, Response } from "express";
import { handleInvoiceStatusUpdate } from "../services/transaction/invoiceUpdate";
import { getSubscriberById } from "../services/subscriber/getSubsById";
import { getSubscriberByUser } from "../services/subscriber/getSubsByUser";
import { cancelPayment } from "../services/transaction/canclePayment";
import { createTransaction } from "../services/transaction/createTransaction";
import { createSubscriber } from "../services/subscriber/createSubs";
import { getTransactionById } from "../services/transaction/getTransactionById";

export class TransactionController {
  async createTransaction(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { type, amount } = req.body;

      if (!userId) throw { status: 400, message: "Unauthorized" };

      if (!type) throw { status: 400, message: "`type` field is required" };

      const subscriber = await createSubscriber({ userId, type });
      const transaction = await createTransaction({ userId, type, amount });

      res.status(201).json({
        message: "Transaction created",
        transaction,
        subscriber
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

  async getTransactionById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const transaction = await getTransactionById(id);

      if (!transaction) throw {
          status: 400,
          message: "Transaction not found",
        };

      res.json(transaction);
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
}
