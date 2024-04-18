import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app, server} from "./socket/socket.js";
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import usersRouter from "./routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";


dotenv.config({
  path: "./../env",
});

connectDB()
  .then(() => {

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

    app.use(express.urlencoded({extended: true, limt: "16kb"}));

    app.use(express.static("public"));

    app.use(cookieParser());


// routes declaration
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/messages", messageRouter);
    app.use("/api/v1/users", usersRouter);


    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Mongo DB connection failed !!`, error);
  });
