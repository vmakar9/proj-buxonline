import { ApiError } from "../erorr/api.error";
import { Company } from "../models/company.model";
import { CompanyToken } from "../models/company.token.model";
import { ICompany } from "../types/company.type";
import { ICompanyTokenPayload } from "../types/token.type";

class CompanyService {
  public async getMyCompany(
    jwtPayload: ICompanyTokenPayload,
  ): Promise<ICompany> {
    const company = await Company.findOne({ _id: jwtPayload._id });
    if (!company) {
      throw new ApiError("You cannot access this company", 403);
    }
    return company;
  }

  public async updateMyCompany(
    jwtPayload: ICompanyTokenPayload,
    body: Partial<ICompany>,
  ): Promise<ICompany> {
    const company = await Company.findOne({ _id: jwtPayload._id });
    if (!company) {
      throw new ApiError("Company not found", 404);
    }

    return Company.findByIdAndUpdate(jwtPayload._id, body, {
      returnDocument: "after",
    });
  }

  public async deleteMyCompany(
    jwtPayload: ICompanyTokenPayload,
  ): Promise<void> {
    const company = await Company.findOne({ _id: jwtPayload._id });
    if (!company) {
      throw new ApiError("Company not found", 404);
    }
    await Promise.all([
      Company.findByIdAndDelete({ _id: jwtPayload._id }),
      CompanyToken.deleteMany({ _company_id: jwtPayload._id }),
    ]);
  }
}

export const companyService = new CompanyService();
