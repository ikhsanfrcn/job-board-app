import express, { Application, Request, Response } from "express";
import cors from "cors";
import { AuthRouter } from "./router/auth.routes";
import { IndustryRouter } from "./router/industry.routes";
import { CompanyRouter } from "./router/company.routes";

const PORT: number = 8000;

const app: Application = express();
app.use(express.json());
app.use(cors());

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to API!" });
});

const authRouter = new AuthRouter();
app.use("/api/users", authRouter.getRouter());

const companyRouter = new CompanyRouter();
app.use("/api/company", companyRouter.getRouter());

const industryRouter = new IndustryRouter();
app.use("/api/industries", industryRouter.getRouter());

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}/api`);
});
