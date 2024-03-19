import Router from "express";

import { candidateController } from "../controllers/candidate.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { fileMiddleware } from "../middleware/file.middleware";

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

router.put(
  "/my-cv",
  authMiddleware.checkCandidateAccessToken,
  fileMiddleware.isCVValid,
  candidateController.uploadCV,
);

router.delete(
  "/my-cv",
  authMiddleware.checkCandidateAccessToken,
  candidateController.deleteCV,
);

export const candidateRouter = router;
