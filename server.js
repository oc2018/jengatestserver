import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/users.routes.js";

const app = express();
env.config();

app.use(cors());
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
