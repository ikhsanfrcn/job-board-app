import { Request, Response } from "express";
import { createInterview } from "../services/interview/createInterview";
import { createInterviewSchema } from "../validation/interviewValidation";
import { updateInterview } from "../services/interview/updateInterview";
import { sendInterviewRemindersService } from "../services/interview/sendReminder";

export class InterviewController {
  async createInterview(req: Request, res: Response) {
    try {
      const validateData = await createInterviewSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const interview = await createInterview(validateData);

      res.status(200).json(interview);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async updateInterview(req: Request, res: Response) {
    try {
      const { id, date, location } = req.body;

      const result = await updateInterview(id, date, location);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async sendInterviewReminders(req: Request, res: Response) {
    try {
      const result = await sendInterviewRemindersService();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
