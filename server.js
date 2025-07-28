import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/users.routes.js";
import jengaRoutes from "./routes/jenga.routes.js";
import propertyRoutes from "./routes/properties.routes.js";
import tenantRoutes from "./routes/tenants.routes.js";
import txnRoutes from "./routes/txn.routes.js";
import expensesRoutes from "./routes/expenses.routes.js";
import jengaCallbackRoutes from "./routes/callbacks.routes.js";
import uploadRoutes from "./routes/uploads.routes.js";

import auth from "./middleware/index.js";
import { allowedOrigins } from "./utils/index.js";
import { startCron } from "./utils/cron-rent.js";

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
app.use(express.urlencoded({ extended: true }));
app.use("/api/jenga", jengaRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", auth, propertyRoutes);
app.use("/api/tenants", auth, tenantRoutes);
app.use("/api/txns", auth, txnRoutes);
app.use("/api/expenses", auth, expensesRoutes);
app.use("/api/response", jengaCallbackRoutes);

app.get("/", (req, res) => {
  res.send("welcome, Emirl's server is up");
});

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    app.listen(PORT, () =>
      console.log(`server running on: http://localhost:${PORT}`)
    );
    startCron();
  } catch (error) {
    console.log(error.message);
  }
};

connectDB();
