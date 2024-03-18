import Router from "express";

import { candidateController } from "../controllers/candidate.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/me",
  authMiddleware.checkCandidateAccessToken,
  candidateController.getMe,
);

router.patch(
  "/me",
  authMiddleware.checkCandidateAccessToken,
  candidateController.updateMe,
);

router.delete(
  "/me",
  authMiddleware.checkCandidateAccessToken,
  candidateController.deleteMe,
);

export const candidateRouter = router;
