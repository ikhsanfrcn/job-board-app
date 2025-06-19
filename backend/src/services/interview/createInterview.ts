import prisma from "../../prisma";
import { CreateInterviewParams } from "../../types/type";
import { sendReminderEmail } from "../../utils/mailer";

export const createInterview = async (params: CreateInterviewParams) => {
  const interview = await prisma.interview.create({
    data: { ...params },
  });

  await prisma.application.update({
    where: { id: params.applicationId },
    data: { status: "INTERVIEW" },
  });

  const application = await prisma.application.findUnique({
    where: { id: params.applicationId },
    include: {
      user: true,
      job: {
        include: {
          company: true,
        },
      },
    },
  });

  const user = application?.user;
  const companyName = application?.job?.company.name || "the company";

  if (user?.email) {
    await sendReminderEmail({
      email: user.email,
      subject: "Interview Scheduled",
      templateName: "interviewNotice",
      templateData: {
        heading: "Interview Scheduled",
        name: user.firstName || "there",
        message: `You have successfully scheduled an interview with ${companyName}.`,
        date: interview.date,
        time: interview.time,
        location: interview.location,
      },
    });
  }

  return { message: "Interview created and email sent", interview };
};
