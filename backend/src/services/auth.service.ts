import { ApiError } from "../erorr/api.error";
import { Candidate } from "../models/candidate.model";
import { CandidateToken } from "../models/candidate.token.model";
import { Company } from "../models/company.model";
import { CompanyToken } from "../models/company.token.model";
import { HR } from "../models/hr.model";
import { HRToken } from "../models/hr.token.model";
import {
  ICandidateCredentials,
  ICompanyCredentials,
  IHRCredentials,
} from "../types/auth.type";
import { ICandidate } from "../types/candidate.type";
import { ICompany } from "../types/company.type";
import { IHR } from "../types/hr.type";
import {
  ICandidateTokenPair,
  ICandidateTokenPayload,
  ICompanyTokenPair,
  ICompanyTokenPayload,
  IHRTokenPair,
  IHRTokenPayload,
} from "../types/token.type";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async candidateRegister(body: ICandidate): Promise<void> {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);
      await Candidate.create({ ...body, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async candidateLogin(
    credentials: ICandidateCredentials,
    candidate: ICandidate,
  ): Promise<ICandidateTokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        candidate.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 409);
      }

      const tokenPair = tokenService.generateCandidateToken({
        _id: candidate._id,
      });

      await CandidateToken.create({
        _candidate_id: candidate._id,
        ...tokenPair,
      });
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }

  public async hrRegister(body: IHR): Promise<void> {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);
      await HR.create({ ...body, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async hrLogin(
    credentials: IHRCredentials,
    hr: IHR,
  ): Promise<IHRTokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        hr.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 409);
      }

      const tokenPair = tokenService.generateHRToken({
        _id: hr._id,
      });

      await HRToken.create({
        _hr_id: hr._id,
        ...tokenPair,
      });
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }

  public async companyRegister(body: ICompany): Promise<void> {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);
      await Company.create({ ...body, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async companyLogin(
    credentials: ICompanyCredentials,
    company: ICompany,
  ): Promise<ICompanyTokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        company.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 409);
      }

      const tokenPair = tokenService.generateCompanyToken({
        _id: company._id,
      });

      await CompanyToken.create({
        _company_id: company._id,
        ...tokenPair,
      });
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }

  public async refreshCandidate(
    tokenInfo: ICandidateTokenPair,
    jwtPayload: ICandidateTokenPayload,
  ): Promise<ICandidateTokenPair> {
    try {
      const tokenPair = tokenService.generateCandidateToken({
        _id: jwtPayload._id,
      });
      await Promise.all([
        CandidateToken.create({ _candidate_id: jwtPayload._id, ...tokenPair }),
        CandidateToken.deleteOne({
          refreshCandidateToken: tokenInfo.refreshCandidateToken,
        }),
      ]);
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refreshHR(
    tokenInfo: IHRTokenPair,
    jwtPayload: IHRTokenPayload,
  ): Promise<IHRTokenPair> {
    try {
      const tokenPair = tokenService.generateHRToken({
        _id: jwtPayload._id,
      });
      await Promise.all([
        HRToken.create({ _hr_id: jwtPayload._id, ...tokenPair }),
        HRToken.deleteOne({
          refreshHRToken: tokenInfo.refreshHRToken,
        }),
      ]);
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refreshCompany(
    tokenInfo: ICompanyTokenPair,
    jwtPayload: ICompanyTokenPayload,
  ): Promise<ICompanyTokenPair> {
    try {
      const tokenPair = tokenService.generateCompanyToken({
        _id: jwtPayload._id,
      });
      await Promise.all([
        CompanyToken.create({ _company_id: jwtPayload._id, ...tokenPair }),
        CompanyToken.deleteOne({
          refreshCompanyToken: tokenInfo.refreshCompanyToken,
        }),
      ]);
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
