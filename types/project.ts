export interface MultilangField {
  tr: string;
  de: string;
  en: string;
}

export interface Project {
  _id: string;
  title: MultilangField;
  description: MultilangField;
  buttonText: MultilangField;
  imageSrc: string;
  slug: string;
  createdAt: string;
}
