import express from "express";

import { configs } from "./configs/configs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(configs.PORT, async () => {
  console.log(`Server is running on ${configs.PORT} PORT`);
});
