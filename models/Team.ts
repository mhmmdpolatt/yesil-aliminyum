import mongoose, { Schema, Document, Model } from "mongoose";

export interface TeamDocument extends Document {
  name: string;
  position: string;
  imageSrc: string;
}

const TeamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    imageSrc: { type: String, required: true }, // resim yolu
  },
  { timestamps: true }
);

const Team: Model<TeamDocument> =
  mongoose.models.Team || mongoose.model<TeamDocument>("Team", TeamSchema);

export default Team;
