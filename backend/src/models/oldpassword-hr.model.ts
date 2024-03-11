import { model, Schema, Types } from "mongoose";

import { HR } from "./hr.model";

const oldPasswordHRSchema = new Schema(
  {
    _HR_id: {
      types: Types.ObjectId,
      required: true,
      ref: HR,
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

export const OldHRPassword = model("Old HR Password", oldPasswordHRSchema);
