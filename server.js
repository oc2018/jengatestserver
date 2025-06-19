import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/users.routes.js";

const app = express();
env.config();

const allowedOrigins = [
  "http://localhost:4000",
  "https://jengatest.vercel.app/",
  "https://jengatest.vercel.app",
  "https://vercel.com/oc2018s-projects/jengatest/HdpNdis9YSMH3CxgwRk6CDE5AKCa",
  "https://jengatest-git-master-oc2018s-projects.vercel.app/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("hello eric");
});

const PORT = process.env.PORT || 5000;

const connectDB = () => {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    app.listen(PORT, () =>
      console.log(`server running on: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

connectDB();
