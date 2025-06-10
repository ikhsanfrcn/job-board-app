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
          job: {
            include: {
              company: true,
            },
          },
        },
      },
    },
  });

  for (const interview of interviews) {
    const user = interview.application?.user;

    const companyName = interview.application?.job?.company.name || "the company";

    if (user?.email) {
      await sendReminderEmail({
        email: user.email,
        subject: "Interview Reminder",
        templateName: "interviewNotice",
        templateData: {
          heading: "Interview Reminder",
          name: user.firstName || "there",
          message: `This is a reminder that you have an upcoming interview scheduled with ${companyName}.`,
          date: interview.date,
          time: interview.time,
          location: interview.location,
        },
      });
    }
  }

  return { message: "Reminders sent", count: interviews.length };
};
