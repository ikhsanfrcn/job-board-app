import cron from "node-cron";
import { sendInterviewRemindersService } from "../services/interview/sendReminder";
import { sendSubscriptionRenewalReminders } from "../services/subscriber/reminder";
import { checkAndExpireSubscribers } from "../services/subscriber/checkExpired";

// Kirim reminder otomatis setiap hari jam 08:00
cron.schedule("0 8 * * *", async () => {
  console.log("Running daily reminder...");
  await sendInterviewRemindersService();
  await sendSubscriptionRenewalReminders();
});

cron.schedule("0 * * * *", async () => {
  await checkAndExpireSubscribers();
});
