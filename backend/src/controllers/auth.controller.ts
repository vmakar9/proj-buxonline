import { NextFunction, Request, Response } from "express";

import { authService } from "../services/auth.service";

class AuthController {
  public async candidateRegister(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await authService.candidateRegister(req.body);
      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async candidateLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { candidate } = req.res.locals;
      const tokenPair = await authService.candidateLogin(
        { email, password },
        candidate,
      );
      return res.status(201).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async hrRegister(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.hrRegister(req.body);
      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async hrLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { hr } = req.res.locals;
      const tokenPair = await authService.hrLogin({ email, password }, hr);
      return res.status(201).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async companyRegister(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await authService.companyRegister(req.body);
      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async companyLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { cooperative_email, password } = req.body;
      const { company } = req.res.locals;
      const tokenPair = await authService.companyLogin(
        { cooperative_email, password },
        company,
      );
      return res.status(201).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async refreshCandidate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { tokenInfo, jwtPayload } = req.res.locals;
      const tokenPair = await authService.refreshCandidate(
        tokenInfo,
        jwtPayload,
      );
      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async refreshHR(req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenInfo, jwtPayload } = req.res.locals;
      const tokenPair = await authService.refreshHR(tokenInfo, jwtPayload);
      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async refreshCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenInfo, jwtPayload } = req.res.locals;
      const tokenPair = await authService.refreshCompany(tokenInfo, jwtPayload);
      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
