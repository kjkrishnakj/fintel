import mongoose, { Schema, Document, models, model } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password: string
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

export default models.User || model<IUser>("User", UserSchema)
