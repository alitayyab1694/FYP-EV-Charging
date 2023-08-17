/** @format */

import express from "express";
import cors from "cors";
import env from "dotenv";
import { connectDb } from "../config/db.js";
import ChargeboxRoutes from "../routes/ChargeboxRouter.js";
import DashboardRoutes from "../routes/DashboardRouter.js";
import UserRoutes from "../routes/UserRoutes.js";
import CompanyRoutes from "../routes/CompanyRoutes.js"
import ReservationRoutes from "../routes/ReservationRoutes.js";
import stripeRoutes from "../routes/stripeRouter.js";

const app = express();

// env config
env.config();

//MongoDb connecting
connectDb();

//content-type:json
app.use(express.json());

//To resolve CORS issue
app.use(cors());

app.use("/api/chargeboxes", ChargeboxRoutes);
app.use("/api/dashboard", DashboardRoutes);
app.use("/api/auth", UserRoutes);
app.use('/api/company', CompanyRoutes)


//reservation
app.use("/api/reservation", ReservationRoutes);
app.use("/api/reservation", ReservationRoutes);
app.use("/api/stripe", stripeRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  console.log("error~", error);
  res.status(error.code || 500);
  res.json({
    message: error.message || "An unknown error occurred!",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`);
});
