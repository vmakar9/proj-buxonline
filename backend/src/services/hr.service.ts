import { ApiError } from "../erorr/api.error";
import { HR } from "../models/hr.model";
import { HRToken } from "../models/hr.token.model";
import { IHR } from "../types/hr.type";
import { IHRTokenPayload } from "../types/token.type";

class HrService {
  public async getMe(jwtPayload: IHRTokenPayload): Promise<IHR> {
    const hr = await HR.findOne({ _id: jwtPayload._id });
    console.log(jwtPayload._id);
    if (!hr) {
      throw new ApiError("You cannot have this hr", 403);
    }
    return hr;
  }

  public async updateMe(
    jwtPayload: IHRTokenPayload,
    body: Partial<IHR>,
  ): Promise<IHR> {
    const hr = await HR.findOne({ _id: jwtPayload._id });
    if (!hr) {
      throw new ApiError("HR not found", 403);
    }
    return HR.findByIdAndUpdate(jwtPayload._id, body, {
      returnDocument: "after",
    });
  }

  public async deleteMe(jwtPayload: IHRTokenPayload): Promise<void> {
    const hr = await HR.findOne({ _id: jwtPayload._id });
    if (!hr) {
      throw new ApiError("Hr not found", 403);
    }
    await Promise.all([
      HR.findByIdAndDelete({ _id: jwtPayload._id }),
      HRToken.deleteMany({ _hr_id: jwtPayload._id }),
    ]);
  }
}

export const hrService = new HrService();
