import { model, Schema, Types } from "mongoose";

import { Company } from "./company.model";

const oldPasswordCompanySchema = new Schema(
  {
    _candidate_id: {
      types: Types.ObjectId,
      required: true,
      ref: Company,
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

export const oldCompanyPassword = model(
  "Old Company Password",
  oldPasswordCompanySchema,
);
