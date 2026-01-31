import express from "express";
import http from "http";
import dotenv from "dotenv";
import databaseConnection from "./config/connection.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import userRouter from "./routes/user.js";
import uiRouter from "./routes/ui.js";
import eventRouter from "./routes/event.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/v1/user/", userRouter);
app.use("/api/v1/ui/", uiRouter);
app.use("/api/v1/event/", eventRouter);


app.use("/api/v1/test", (req, res) => {
  return res.status(200).json({ message: "tested" });
});
app.use(notFound);
app.use(errorHandler);

server.listen(process.env.PORT || 4000, () => {
  databaseConnection();
  console.log("Server is running " + process.env.PORT || 4000);
});
