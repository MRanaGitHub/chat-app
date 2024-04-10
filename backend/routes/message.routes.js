import express from "express";
import {
  getUserMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:id", verifyJwt, getUserMessages);

router.post("/send/:id", verifyJwt, sendMessage);

export default router;
