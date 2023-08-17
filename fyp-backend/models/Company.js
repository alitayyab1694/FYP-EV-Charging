/** @format */

import { Schema, model } from 'mongoose'

const companySchema = model(
  'Company',
  new Schema(
    {
      companyname: { type: String },
      ownername: { type: String },
      description: { type: String },
      isDeleted:{type:Boolean,default:false}
     
    },
   
    {
      timestamps: true,
    }
  )
)

export default companySchema
