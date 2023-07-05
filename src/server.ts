import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";

import authRouter from "./routes/authRoutes";
import empRouter from "./routes/userRoutes";
import validateToken from "./middlewares/authenticateToken";
import organisationRouter from "./routes/organisationRoutes";
import ticketRouter from "./routes/ticketRoutes";
import commentRouter from "./routes/commentRoutes";
import departmentRouter from "./routes/departmentRoutes";
import assetRouter from "./routes/assetRoutes";

dotenv.config();

if (!process.env.SERVER_PORT) {
  process.exit(1);
}

const app: Express = express();

const PORT = process.env.SERVER_PORT;

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/api/v1", (_req: Request, res: Response) =>
  res.status(200).json({ message: `Server listening at PORT ${PORT}!` })
);

app.use("/api/v1/auth", authRouter);

app.use(validateToken);

app.use("/api/v1/users", empRouter);
app.use("/api/v1/tickets", ticketRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/organisations", organisationRouter);
app.use("/api/v1/assets", assetRouter);

app.use("*", (_req: Request, res: Response) => {
  res.status(400).json({ message: "Invalid request URL!" });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server spinning on PORT : ${PORT}`));

module.exports = app;
