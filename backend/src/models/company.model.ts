import { model, Schema } from "mongoose";

import { EAccountStatusEnum } from "../enum/account-status.enum";

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cooperative_email: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
    },
    site_link: {
      type: String,
    },
    about_company: {
      type: String,
    },
    status: {
      type: String,
      default: EAccountStatusEnum.not_verified,
      enum: EAccountStatusEnum,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Company = model("Company", companySchema);
