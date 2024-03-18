import Router from "express";

import { hrController } from "../controllers/hr.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/me", authMiddleware.checkHRAccessToken, hrController.getMe);

router.patch("/me", authMiddleware.checkHRAccessToken, hrController.updateMe);

router.delete("/me", authMiddleware.checkHRAccessToken, hrController.deleteMe);

export const hrRouter = router;
