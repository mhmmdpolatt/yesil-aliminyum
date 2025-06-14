import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  kullaniciAdi: string;
  parola: string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    kullaniciAdi: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    parola: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
