/** @format */

import express from "express";
import {
 createPayment
} from "../controller/StripeController.js";

const router = express.Router();

router.post("/create-charge", createPayment);

export default router;
