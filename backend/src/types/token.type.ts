import { ICandidate } from "./candidate.type";
import { ICompany } from "./company.type";
import { IHR } from "./hr.type";

export interface ICandidateTokenPair {
  accessCandidateToken: string;
  refreshCandidateToken: string;
}

export interface IHRTokenPair {
  accessHRToken: string;
  refreshHRToken: string;
}

export interface ICompanyTokenPair {
  accessCompanyToken: string;
  refreshCompanyToken: string;
}

export type ICandidateTokenPayload = Pick<ICandidate, "_id">;

export type IHRTokenPayload = Pick<IHR, "_id">;

export type ICompanyTokenPayload = Pick<ICompany, "_id">;
