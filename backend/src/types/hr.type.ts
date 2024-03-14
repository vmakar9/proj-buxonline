import { Document } from "mongoose";

export interface IHR extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
}
