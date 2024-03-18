import { ApiError } from "../erorr/api.error";
import { Candidate } from "../models/candidate.model";
import { CandidateToken } from "../models/candidate.token.model";
import { ICandidate } from "../types/candidate.type";
import { ICandidateTokenPayload } from "../types/token.type";

class CandidateService {
  public async getMe(jwtPayload: ICandidateTokenPayload): Promise<ICandidate> {
    const candidate = await Candidate.findOne({ _id: jwtPayload._id });
    if (!candidate) {
      throw new ApiError("You cant get this candidate", 403);
    }
    return candidate;
  }

  public async updateMe(
    jwtPayload: ICandidateTokenPayload,
    body: Partial<ICandidate>,
  ): Promise<ICandidate> {
    const candidate = await Candidate.findOne({ _id: jwtPayload._id });
    if (!candidate) {
      throw new ApiError("You cant get this candidate", 403);
    }
    return Candidate.findByIdAndUpdate(jwtPayload._id, body, {
      returnDocument: "after",
    });
  }

  public async deleteMe(jwtPayload: ICandidateTokenPayload): Promise<void> {
    const candidate = await Candidate.findOne({ _id: jwtPayload._id });
    if (!candidate) {
      throw new ApiError("You cant get this candidate", 403);
    }
    await Promise.all([
      Candidate.findByIdAndDelete({ _id: jwtPayload._id }),
      CandidateToken.deleteMany({ _candidate_id: jwtPayload._id }),
    ]);
  }
}

export const candidateService = new CandidateService();
