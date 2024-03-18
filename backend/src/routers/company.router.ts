import Router from "express";

import { companyController } from "../controllers/company.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/my-company",
  authMiddleware.checkCompanyAccessToken,
  companyController.getMyCompany,
);

router.patch(
  "/my-company",
  authMiddleware.checkCompanyAccessToken,
  companyController.updateMyCompany,
);

router.delete(
  "/my-company",
  authMiddleware.checkCompanyAccessToken,
  companyController.deleteMyCompany,
);

export const companyRouter = router;
