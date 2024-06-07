import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

app.use(
  cors({
    origin: [
      "https://blood-donation-client-theta.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is working....!",
  });
});

app.use("/api", router);

app.use(globalErrorHandler);

export default app;
