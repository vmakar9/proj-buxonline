import { model, Schema, Types } from "mongoose";

import { Candidate } from "./candidate.model";

const candidateTokenSchema = new Schema(
  {
    _candidate_id: {
      type: Types.ObjectId,
      required: true,
      ref: Candidate,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Token = model("Candidate Token", candidateTokenSchema);
