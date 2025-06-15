// types/contactInfo.ts
export type Address = {
  label: string;
  address: string;
};

export type MapEmbed = {
  label: string;
  url: string;
};

export type ContactInfo = {
  _id?: string;
  addresses: Address[];
  emails: string[];
  phones: string[];
  mapEmbeds: MapEmbed[]; // 🟢 burası da aynı isimde olacak
  createdAt?: string;
};
