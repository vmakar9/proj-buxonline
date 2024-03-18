import { NextFunction, Request, Response } from "express";

import { candidateService } from "../services/candidate.service";
import { ICandidate } from "../types/candidate.type";
import { ICandidateTokenPayload } from "../types/token.type";

class CandidateController {
  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ICandidateTokenPayload;
      const candidate = await candidateService.getMe(jwtPayload);
      res.json({ data: candidate });
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ICandidateTokenPayload;
      const body = req.body as Partial<ICandidate>;

      const candidate = await candidateService.updateMe(jwtPayload, body);
      res.status(201).json(candidate);
    } catch (e) {
      next(e);
    }
  }

  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ICandidateTokenPayload;
      await candidateService.deleteMe(jwtPayload);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const candidateController = new CandidateController();