/** @format */

import express from "express";
import {
  getReservations,
  getReserve,
  addReserve,
  updateReserve,
  deleteReserve,
  getReservationsByCompany,
} from "../controller/ReservationController.js";

const router = express.Router();

router.get("/", getReservations);
router.get("/:id", getReserve);
router.get('/company/:id', getReservationsByCompany)
router.post("/create", addReserve);
router.patch("/:id", updateReserve);
router.delete("/:id", deleteReserve);

export default router;
