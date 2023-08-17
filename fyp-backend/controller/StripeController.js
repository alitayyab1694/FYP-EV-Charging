/** @format */

import stripe from "stripe";
import ReservationSchema from "../models/Reservations.js";
import ChargeboxSchema from "../models/Chargebox.js";
import User from "../models/User.js";

const stripeInstance = stripe(
  "sk_test_51H64odEGhJpVZtxXTBVcvT34NrAZp0A5x5gdA32IAgN6Ac6adoKrOPMqiKaaRmf0sQ8iUvFVbIIvjqn1UXjsixTC00hWhpxTvu"
);
export const createPayment = async (req, res, next) => {
 const {token , date , chargeBoxId , slot , firebaseId , newSlot , chargeboxid } = req.body; // Token received from the client-side Stripe Checkout component
  try {
    const user  =await User.findOne({email:firebaseId })
    await stripeInstance.charges.create({
      amount: 1000, // Amount in cents
      currency: 'USD',
      source: token.id,
      description: 'Thanks for the Reservation'
    });
 const resChargeBox =   await ChargeboxSchema.findOneAndUpdate(
  { _id: chargeBoxId,},
  { $set: { "slots": slot } },
  { new: true },
);
    const reserve = new ReservationSchema({
      chargeboxId: chargeBoxId,
      chargeboxid: chargeboxid,
      reservationDate: date,
      userId: user._id,
      company: resChargeBox.company,
      startTime : newSlot.startTime,
      EndTime : newSlot.endTime
    }); // Updated from Reserve to Reservations
    await reserve.save();

    res.status(200).json({ message: "Charge created successfully" });
  } catch (error) {
    console.log("🚀 ~ file: StripeController.js:22 ~ createPayment ~ error:", error)
    res.status(500).json({ error: 'Error creating charge' });
  }
};
