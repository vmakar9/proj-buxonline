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
    },
    site_link: {
      type: String,
    },
    about_company: {
      type: String,
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
