import express from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/configs";
import { authRouter } from "./routers/auth.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);

  console.log(`Server is running on ${configs.PORT} PORT`);
});
