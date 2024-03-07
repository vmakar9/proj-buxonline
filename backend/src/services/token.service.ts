import * as jwt from "jsonwebtoken";

import { configs } from "../configs/configs";
import {
  ICandidateTokenPair,
  ICandidateTokenPayload,
  ICompanyTokenPair,
  ICompanyTokenPayload,
  IHRTokenPair,
  IHRTokenPayload,
} from "../types/token.type";

class TokenService {
  public generateCandidateToken(
    payload: ICandidateTokenPayload,
  ): ICandidateTokenPair {
    const accessCandidateToken = jwt.sign(
      payload,
      configs.JWT_CANDIDATE_ACCESS_SECRET,
      {
        expiresIn: "1d",
      },
    );
    const refreshCandidateToken = jwt.sign(
      payload,
      configs.JWT_CANDIDATE_REFRESH_SECRET,
      {
        expiresIn: "30h",
      },
    );
    return {
      accessCandidateToken,
      refreshCandidateToken,
    };
  }

  public generateHRToken(payload: IHRTokenPayload): IHRTokenPair {
    const accessHRToken = jwt.sign(payload, configs.JWT_HR_ACCESS_SECRET, {
      expiresIn: "1d",
    });
    const refreshHRToken = jwt.sign(payload, configs.JWT_HR_REFRESH_SECRET, {
      expiresIn: "30h",
    });
    return {
      accessHRToken,
      refreshHRToken,
    };
  }

  public generateCompanyToken(
    payload: ICompanyTokenPayload,
  ): ICompanyTokenPair {
    const accessCompanyToken = jwt.sign(
      payload,
      configs.JWT_COMPANY_ACCESS_SECRET,
      {
        expiresIn: "1d",
      },
    );
    const refreshCompanyToken = jwt.sign(
      payload,
      configs.JWT_COMPANY_REFRESH_SECRET,
      {
        expiresIn: "30h",
      },
    );
    return {
      accessCompanyToken,
      refreshCompanyToken,
    };
  }
}

export const tokenService = new TokenService();
