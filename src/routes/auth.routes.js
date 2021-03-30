import { Router } from "express";

const router = Router();

import * as authController from "../controllers/auth.controller";

router.post("/signup", authController.singUp);
router.post("/signin", authController.singIn);

export default router;
