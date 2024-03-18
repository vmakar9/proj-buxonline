import { Document } from "mongoose";
export interface ICompany extends Document {
  name: string;
  cooperative_email: string;
  specialization?: string;
  site_link?: string;
  about_company?: string;
  status: string;
  password: string;
}
