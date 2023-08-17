import { Schema, model } from 'mongoose'
// import uniqueValidator from "mongoose-unique-validator";

const userSchema = model(
  'User',
  new Schema({
    email: { type: String, unique: true },
    password: { type: String, minLength: 6 },
    role: { type: String, enum: ['admin', 'companyAdmin'] },
    name: { type: String },
    firebaseId: { type: String },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: false,
    },
  })
)

export default userSchema
