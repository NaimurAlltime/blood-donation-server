import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

const allowedOrigins = ["https://blood-donation-client-theta.vercel.app"];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin as string)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: "*" }));

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is working....!",
  });
});

app.use("/api", router);

app.use(globalErrorHandler);

export default app;
