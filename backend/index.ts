import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { AppError } from "./src/utils/appError";
import { globalErrorHandler } from "./src/utils/globalErrorHandler";
import { authRouter } from "./src/app/routes/authRoute";
import rateLimit from "express-rate-limit";
import { tenantRouter } from "./src/app/routes/tenantRoute";
import { taskRouter } from "./src/app/routes/taskRoute";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  message: "Too many requests, please try again later.",
});

app.use(limiter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tenants", tenantRouter);
app.use("/api/v1/tasks", taskRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
