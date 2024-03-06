import { model, Schema } from "mongoose";

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
      required: true,
    },
    site_link: {
      type: String,
    },
    about_company: {
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
