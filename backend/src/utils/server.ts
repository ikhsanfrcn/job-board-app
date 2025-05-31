import cron from "node-cron";
import { sendInterviewRemindersService } from "../services/interview/sendReminder";

// Kirim reminder otomatis setiap hari jam 08:00
cron.schedule("0 8 * * *", async () => {
  console.log("Running daily interview reminder...");
  await sendInterviewRemindersService();
});
