import { NextFunction, Request, Response } from "express";

import { authService } from "../services/auth.service";
import { IChangePassword } from "../types/auth.type";
import {
  ICandidateTokenPayload,
  ICompanyTokenPayload,
  IHRTokenPayload,
} from "../types/token.type";

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

  public async changeCandidatePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ICandidateTokenPayload;
      const body = req.body as IChangePassword;

      await authService.changeCandidatePassword(body, jwtPayload);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async changeHRPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IHRTokenPayload;
      const body = req.body as IChangePassword;

      await authService.changeHRPassword(body, jwtPayload);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async changeCompanyPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ICompanyTokenPayload;
      const body = req.body as IChangePassword;

      await authService.changeCompanyPassword(body, jwtPayload);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async forgotCandidatePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { candidate } = req.res.locals;

      await authService.forgotCandidatePassword(candidate);

      return res.json("OK");
    } catch (e) {
      next(e);
    }
  }

  public async setCandidateForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const token = req.params.token;
      const newPassword = req.body.newPassword;

      await authService.setForgotPassword(newPassword, token);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
