import express, { Application, Request, Response } from "express";
import cors from "cors";
import { AuthRouter } from "./router/auth.routes";
import { IndustryRouter } from "./router/industry.routes";
import { CompanyRouter } from "./router/company.routes";
import { UserRouter } from "./router/user.routes";
import { JobRouter } from "./router/job.routes";
import { ApplicationRouter } from "./router/application.routes";
import { ReviewRouter } from "./router/review.routes";
import { TestRouter } from "./router/test.router";
import { InterviewRouter } from "./router/interview.routes";
import { DeveloperRouter } from "./router/developer.routes";
import { SubscriberRouter } from "./router/subscriber.routes";
import { ResumeRouter } from "./router/resume.routes";
import { SkillAssessmentRouter } from "./router/assessment.routes";
import { TransactionRouter } from "./router/transaction.routes";
import { SubscriptionRouter } from "./router/subscription.routes";

const PORT: number = 8000;

const app: Application = express();
app.use(express.json());
app.use(cors());

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to API!" });
});

const authRouter = new AuthRouter();
app.use("/api/auth", authRouter.getRouter());

const developerRouter = new DeveloperRouter();
app.use("/api/dev", developerRouter.getRouter());

const companyRouter = new CompanyRouter();
app.use("/api/company", companyRouter.getRouter());

const industryRouter = new IndustryRouter();
app.use("/api/industries", industryRouter.getRouter());

const userRouter = new UserRouter();
app.use("/api/users", userRouter.getRouter());

const jobRouter = new JobRouter();
app.use("/api/jobs", jobRouter.getRouter());

const applicationRouter = new ApplicationRouter();
app.use("/api/applications", applicationRouter.getRouter());

const reviewRouter = new ReviewRouter();
app.use("/api/reviews", reviewRouter.getRouter());

const testRouter = new TestRouter();
app.use("/api/test", testRouter.getRouter());

const interviewRouter = new InterviewRouter();
app.use("/api/interviews", interviewRouter.getRouter());

const subscriberRouter = new SubscriberRouter();
app.use("/api/subscribers", subscriberRouter.getRouter());

const resumeRouter = new ResumeRouter();
app.use("/api/resumes", resumeRouter.getRouter());

const skillAssessmentRouter = new SkillAssessmentRouter();
app.use("/api/assessment", skillAssessmentRouter.getRouter())

const transactionRouter = new TransactionRouter();
app.use("/api/transactions", transactionRouter.getRouter());

const subscriptionRouter = new SubscriptionRouter();
app.use("/api/subscriptions", subscriptionRouter.getRouter())

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}/api`);
});
