import { Schema, models, model, Document } from "mongoose";
import { ContactInfo as ContactInfoType } from "../types/contactInfo";

// Tip birleştirme
type ContactInfoDocument = ContactInfoType & Document;

// Alt şemalar
const AddressSchema = new Schema({
  label: { type: String, required: true },
  address: { type: String, required: true },
});

const MapEmbedSchema = new Schema({
  label: { type: String, required: true },
  url: { type: String, required: true },
});

// Ana şema
const ContactInfoSchema = new Schema<ContactInfoDocument>({
  addresses: { type: [AddressSchema], required: true },
  emails: { type: [String], required: true },
  phones: { type: [String], required: true },
  mapEmbeds: { type: [MapEmbedSchema], required: true }, // 🟢 İsim düzeltildi
});

export default models.ContactInfo ||
  model<ContactInfoDocument>("ContactInfo", ContactInfoSchema);
