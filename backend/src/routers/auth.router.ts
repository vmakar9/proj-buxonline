import Router from "express";

import { authController } from "../controllers/auth.controller";
import { candidateMiddleware } from "../middleware/candidate.middleware";
import { companyMiddleware } from "../middleware/company.middleware";
import { hrMiddleware } from "../middleware/hr.middleware";

const router = Router();

router.post(
  "/candidate-register",
  candidateMiddleware.getDynamicallyAndThrow("email"),
  authController.candidateRegister,
);

router.post(
  "/candidate-login",
  candidateMiddleware.getDynamicallyOrThrow("email"),
  authController.candidateLogin,
);

router.post(
  "/hr-register",
  hrMiddleware.getDynamicallyAndThrow("email"),
  authController.hrRegister,
);

router.post(
  "/hr-login",
  hrMiddleware.getDynamicallyOrThrow("email"),
  authController.hrLogin,
);

router.post(
  "/company-register",
  companyMiddleware.getDynamicallyAndThrow("cooperative_email"),
  authController.companyRegister,
);

router.post(
  "/company-login",
  companyMiddleware.getDynamicallyOrThrow("cooperative_email"),
  authController.companyLogin,
);

export const authRouter = router;
