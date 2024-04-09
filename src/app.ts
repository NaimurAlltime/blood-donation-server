import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import router from "./app/routes";

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is working....!",
  });
});

app.use("/api", router);

export default app;
