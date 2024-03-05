import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5100, async () => {
  console.log(`Server is running on http://localhost:5100`);
});
