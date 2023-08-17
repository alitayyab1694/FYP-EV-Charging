/** @format */

import express from "express";
import {
  getChargeboxes,
  getChargebox,
  addChargebox,
  updateChargebox,
  deleteVendor,
  getChargeboxByCompany,
} from "../controller/ChargeboxController.js";

const router = express.Router();

router.get("/", getChargeboxes);
router.get("/:id", getChargebox);
router.post("/create", addChargebox);
router.patch("/:id", updateChargebox);
router.get('/company/:id', getChargeboxByCompany)

router.delete("/:id", deleteVendor);

export default router;
