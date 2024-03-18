import express from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/configs";
import { adminRouter } from "./routers/admin.router";
import { authRouter } from "./routers/auth.router";
import { candidateRouter } from "./routers/candidate.router";
import { companyRouter } from "./routers/company.router";
import { hrRouter } from "./routers/hr.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/candidate", candidateRouter);
app.use("/hr", hrRouter);
app.use("/company", companyRouter);
app.use("/admin", adminRouter);
app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);

  console.log(`Server is running on ${configs.PORT} PORT`);
});
