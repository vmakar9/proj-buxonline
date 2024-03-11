import { model, Schema, Types } from "mongoose";

import { Candidate } from "./candidate.model";

const oldPasswordCandidateSchema = new Schema(
  {
    _candidate_id: {
      types: Types.ObjectId,
      required: true,
      ref: Candidate,
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

export const OldCandidatePassword = model(
  "Old Candidate Password",
  oldPasswordCandidateSchema,
);
