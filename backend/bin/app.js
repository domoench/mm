import express from "express";
import cors from "cors";
import { writeStat, getGranularStats } from "../lib/db.js";
import { printGranularStats, printAggregateStats } from "../lib/mm.js";

const app = express();
const port = 3000;

// Request body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
const allowedOrigins = ["http://localhost:3001"]; // TODO
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

app.post("/stats", async (req, res) => {
  const stats = req.body; // TODO Is there a way to use the Stats typescript type from frontend?
  await writeStat(stats); // TODO batch this? try/catch
  console.log("Wrote stats:", stats);
  printGranularStats();
  printAggregateStats();
  res.send("Hello World!"); // TODO
});

app.get("/stats", async (req, res) => {
  const stats = await getGranularStats();
  res.json(stats);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
