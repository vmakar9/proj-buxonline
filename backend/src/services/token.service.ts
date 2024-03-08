import * as jwt from "jsonwebtoken";

import { configs } from "../configs/configs";
import { ECandidateTokenEnum } from "../enum/candidate-token-type.enum";
import { ECompanyTokenEnum } from "../enum/company-token-type.enum";
import { EHRTokenEnum } from "../enum/hr-token-type.enum";
import { ApiError } from "../erorr/api.error";
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

  public checkCandidateToken(
    token: string,
    tokenType: ECandidateTokenEnum,
  ): ICandidateTokenPayload {
    try {
      let secret = "";
      switch (tokenType) {
        case ECandidateTokenEnum.accessCandidate:
          secret = configs.JWT_CANDIDATE_ACCESS_SECRET;
          break;
        case ECandidateTokenEnum.refreshCandidate:
          secret = configs.JWT_CANDIDATE_REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as ICandidateTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public checkHRToken(token: string, tokenType: EHRTokenEnum): IHRTokenPayload {
    try {
      let secret = "";
      switch (tokenType) {
        case EHRTokenEnum.accessHR:
          secret = configs.JWT_HR_ACCESS_SECRET;
          break;
        case EHRTokenEnum.refreshHR:
          secret = configs.JWT_HR_REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as IHRTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public checkCompanyToken(
    token: string,
    tokenType: ECompanyTokenEnum,
  ): ICompanyTokenPayload {
    try {
      let secret = "";
      switch (tokenType) {
        case ECompanyTokenEnum.accessCompany:
          secret = configs.JWT_COMPANY_ACCESS_SECRET;
          break;
        case ECompanyTokenEnum.refreshCompany:
          secret = configs.JWT_COMPANY_REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as ICandidateTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
