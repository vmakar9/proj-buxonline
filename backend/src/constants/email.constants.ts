import { EEmailCandidateEnum } from "../enum/email-candiate.enum";

export const allTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [EEmailCandidateEnum.FORGOT_PASSWORD]: {
    subject: "Restore password",
    templateName: "forgot_candidate",
  },
};
