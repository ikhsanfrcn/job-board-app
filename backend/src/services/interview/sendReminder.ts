import prisma from "../../prisma";
import { sendReminderEmail } from "../../utils/mailer";

export const sendInterviewRemindersService = async () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowDateOnly = tomorrow.toISOString().split("T")[0]; // Format: "YYYY-MM-DD"

  const interviews = await prisma.interview.findMany({
    where: {
      date: tomorrowDateOnly,
    },
    include: {
      application: {
        include: {
          user: true,
        },
      },
    },
  });

  for (const interview of interviews) {
    const user = interview.application?.user;

    if (user?.email) {
      await sendReminderEmail({
        email: user.email,
        subject: "Interview Reminder",
        templateName: "interviewReminder",
        templateData: {
          name: user.firstName || "there",
          date: interview.date,
          location: interview.location,
        },
      });
    }
  }

  return { message: "Reminders sent", count: interviews.length };
};
