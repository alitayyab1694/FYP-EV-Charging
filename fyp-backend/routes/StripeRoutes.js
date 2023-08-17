/** @format */

import express from "express";
import { addStripe } from "../controller/StripeController.js";

const router = express.Router();

router.post("/create", addStripe);

export default router;
