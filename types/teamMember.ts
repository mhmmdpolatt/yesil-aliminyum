export interface MultilangField {
  tr: string;
  en: string;
  de: string;
}

export interface TeamMember {
  _id?: string;
  name: MultilangField;
  position: MultilangField;
  imageSrc: string; // Resim URL'si
  createdAt?: Date;
  updatedAt?: Date;
}
