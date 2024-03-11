import { config } from "dotenv";
config();
export const configs = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,

  SALT: +process.env.SALT,

  JWT_CANDIDATE_ACCESS_SECRET: process.env.JWT_CANDIDATE_ACCESS_SECRET,
  JWT_CANDIDATE_REFRESH_SECRET: process.env.JWT_CANDIDATE_REFRESH_SECRET,

  JWT_HR_ACCESS_SECRET: process.env.JWT_HR_ACCESS_SECRET,
  JWT_HR_REFRESH_SECRET: process.env.JWT_HR_REFRESH_SECRET,

  JWT_COMPANY_ACCESS_SECRET: process.env.JWT_COMPANY_ACCESS_SECRET,
  JWT_COMPANY_REFRESH_SECRET: process.env.JWT_COMPANY_REFRESH_SECRET,

  JWT_CANDIDATE_FORGOT_SECRET: process.env.JWT_CANDIDATE_FORGOT_SECRET,
  JWT_HR_FORGOT_SECRET: process.env.JWT_HR_FORGOT_SECRET,
  JWT_COMPANY_FORGOT_SECRET: process.env.JWT_COMPANY_FORGOT_SECRET,

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,
};
