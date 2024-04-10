import express from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { getAllUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", verifyJwt, getAllUser);

export default router;
