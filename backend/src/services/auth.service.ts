import { EActionTokenType } from "../enum/action-token-type.enum";
import { EEmailCandidateEnum } from "../enum/email-candiate.enum";
import { ApiError } from "../erorr/api.error";
import { ActionCandidateToken } from "../models/action.token.candidate.model";
import { Candidate } from "../models/candidate.model";
import { CandidateToken } from "../models/candidate.token.model";
import { Company } from "../models/company.model";
import { CompanyToken } from "../models/company.token.model";
import { HR } from "../models/hr.model";
import { HRToken } from "../models/hr.token.model";
import {
  ICandidateCredentials,
  IChangePassword,
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
import { emailService } from "./email.service";
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

  public async changeCandidatePassword(
    data: IChangePassword,
    jwtPayload: ICandidateTokenPayload,
  ): Promise<void> {
    try {
      const candidate = await Candidate.findOne({ _id: jwtPayload._id });
      if (!candidate) {
        throw new ApiError("Candidate not found", 404);
      }

      const isMatch = await passwordService.compare(
        data.oldPassword,
        candidate.password,
      );
      if (!isMatch) {
        throw new ApiError("Old password is invalid", 400);
      }

      const hashedNewCandidatePassword = await passwordService.hash(
        data.newPassword,
      );

      await Candidate.findByIdAndUpdate(
        candidate._id,
        { password: hashedNewCandidatePassword },
        { returnDocument: "after" },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changeHRPassword(
    data: IChangePassword,
    jwtPayload: IHRTokenPayload,
  ): Promise<void> {
    try {
      const hr = await HR.findOne({ _id: jwtPayload._id });
      if (!hr) {
        throw new ApiError("HR not found", 404);
      }

      const isMatch = await passwordService.compare(
        data.oldPassword,
        hr.password,
      );
      if (!isMatch) {
        throw new ApiError("Old password is invalid", 400);
      }

      const hashedNewHRPassword = await passwordService.hash(data.newPassword);

      await HR.findByIdAndUpdate(
        hr._id,
        { password: hashedNewHRPassword },
        { returnDocument: "after" },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changeCompanyPassword(
    data: IChangePassword,
    jwtPayload: ICompanyTokenPayload,
  ): Promise<void> {
    try {
      const company = await Company.findOne({ _id: jwtPayload._id });
      if (!company) {
        throw new ApiError("Company not found", 404);
      }

      const isMatch = await passwordService.compare(
        data.oldPassword,
        company.password,
      );
      if (!isMatch) {
        throw new ApiError("Old password is invalid", 400);
      }

      const hashedNewCompanyPassword = await passwordService.hash(
        data.newPassword,
      );

      await Company.findByIdAndUpdate(
        company._id,
        { password: hashedNewCompanyPassword },
        { returnDocument: "after" },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotCandidatePassword(candidate: ICandidate): Promise<void> {
    try {
      const actionToken = tokenService.generateCandidateActionToken(
        { _id: candidate._id },
        EActionTokenType.forgot,
      );

      await ActionCandidateToken.create({
        _candidate_id: candidate._id,
        tokenType: EActionTokenType.forgot,
        actionToken,
      });

      await emailService.sendCandidateEmail(
        candidate.email,
        EEmailCandidateEnum.FORGOT_PASSWORD,
        {
          token: actionToken,
        },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setForgotPassword(password: string, actionToken: string) {
    try {
      const payload = tokenService.checkCandidateActionToken(
        actionToken,
        EActionTokenType.forgot,
      );
      const entity = await ActionCandidateToken.findOne({ actionToken });
      if (!entity) {
        throw new ApiError("Not valid token", 400);
      }
      const newHashedPassword = await passwordService.hash(password);
      await Promise.all([
        Candidate.findByIdAndUpdate(payload._id, {
          password: newHashedPassword,
        }),
        ActionCandidateToken.deleteOne({ actionToken }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
