import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/users.routes.js";
import jengaRoutes from "./routes/jenga.routes.js";
import propertyRoutes from "./routes/properties.routes.js";
import tenantRoutes from "./routes/tenants.routes.js";
import auth from "./middleware/index.js";
import { allowedOrigins } from "./utils/index.js";

const app = express();
env.config();

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
app.use("/api/jenga", auth, jengaRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/tenants", tenantRoutes);

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
