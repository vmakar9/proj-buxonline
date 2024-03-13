import Router from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
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

router.post(
  "/refresh-candidate",
  authMiddleware.checkCandidateRefreshToken,
  authController.refreshCandidate,
);

router.post(
  "/refresh-hr",
  authMiddleware.checkHRRefreshToken,
  authController.refreshHR,
);

router.post(
  "/refresh-company",
  authMiddleware.checkCompanyRefreshToken,
  authController.refreshCompany,
);

router.post(
  "/change-password-candidate",
  authMiddleware.checkCandidateAccessToken,
  authController.changeCandidatePassword,
);

router.post(
  "/change-password-hr",
  authMiddleware.checkHRAccessToken,
  authController.changeHRPassword,
);

router.post(
  "/change-password-company",
  authMiddleware.checkCompanyAccessToken,
  authController.changeCompanyPassword,
);

router.post(
  "/forgot-password-candidate",
  candidateMiddleware.getDynamicallyOrThrow("email"),
  authController.forgotCandidatePassword,
);

router.post(
  "/forgot-password-hr",
  hrMiddleware.getDynamicallyOrThrow("email"),
  authController.forgotHRPassword,
);

router.post(
  "/forgot-password-company",
  companyMiddleware.getDynamicallyOrThrow("cooperative_email"),
  authController.forgotCompanyPassword,
);

router.patch(
  "/forgot-password-candidate/:token",
  authController.setCandidateForgotPassword,
);

router.patch("/forgot-password-hr/:token", authController.setHRForgotPassword);

router.patch(
  "/forgot-password-company/:token",
  authController.setCompanyForgotPassword,
);

export const authRouter = router;
