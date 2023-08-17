import express from "express";
import { getDashboarData } from "../controller/DashboardController.js";

const router = express.Router();

router.get("/", getDashboarData);

export default router;
