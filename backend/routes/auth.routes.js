import express from "express";
import {
  loginUser,
  logoutUser,
  singUpUser,
} from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", loginUser);

router.route("/signup").post(singUpUser);

router.post("/logout", verifyJwt, logoutUser);

export default router;
