import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!"); // TODO
});

app.get("/stats", (req, res) => {
  res.send("Hello World!"); // TODO
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
