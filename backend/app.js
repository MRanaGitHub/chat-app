import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limt: "16kb",
  })
);

app.use(express.urlencoded({ extended: true, limt: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

// import all routes
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import usersRouter from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/users", usersRouter);

export { app };
