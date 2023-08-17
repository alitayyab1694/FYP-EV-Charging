/** @format */

import mongoose, { Schema, model } from "mongoose";

const ChargeboxSchema = 
  new Schema(
    {
      id: {
        type: String,
        unique: true,
        required: true
    },
      name: { type: String },
      ocpp: {
        chargeboxId: { type: String },
        registrationStatus: {
          value: { type: String },
          label: { type: String },
        },
        chargePointModel: { type: String },
        endpointAddress: { type: String },
      },
      address: {
        street: { type: String },
        houseNo: { type: String },
        zipcode: { type: String },
        country: {
          value: { type: String },
          label: { type: String },
        },
        state: {
          value: { type: String },
          label: { type: String },
        },
        city: {
          value: { type: String },
          label: { type: String },
        },
      },
      misc: {
        desc: { type: String },
        chargingType : { type: String },
        adminAddress: { type: String },
        latitude: { type: Number },
        longitude: { type: Number },
        notes: { type: String },
        isPeakTime: { type: Boolean, default: false },
        RateApplied: { type: Number },
        EstimatedCost: { type: Number },
        EstimatedKWH: { type: Number },
        TimeReserved: { type: Number },
      },
      slots: [],
      company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )


const Chargebox = model('Chargebox', ChargeboxSchema);

export default Chargebox;
