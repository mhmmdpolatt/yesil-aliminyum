// /models/Project.ts
import mongoose, { Schema, Document, Model } from "mongoose";

interface LanguageStrings {
  tr: string;
  de: string;
  en: string;
}

export interface ProjectDocument extends Document {
  title: LanguageStrings;
  description: LanguageStrings;
  buttonText: LanguageStrings;
  imageSrc: string;
  slug: string;
  language?: string;
}

const LanguageStringsSchema = new Schema<LanguageStrings>(
  {
    tr: { type: String, required: true },
    de: { type: String, required: true },
    en: { type: String, required: true },
  },
  { _id: false }
);

const ProjectSchema = new Schema<ProjectDocument>(
  {
    title: { type: LanguageStringsSchema, required: true },
    description: { type: LanguageStringsSchema, required: true },
    buttonText: { type: LanguageStringsSchema, required: false },
    imageSrc: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    language: { type: String, default: "multi" },
  },
  {
    timestamps: true,
  }
);

const Project: Model<ProjectDocument> =
  mongoose.models.Project ||
  mongoose.model<ProjectDocument>("Project", ProjectSchema);

export default Project;
