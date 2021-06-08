import * as Contentful from "contentful";
import {
  TypeMenuFields,
  TypeProfileFields,
  TypeSeoFields,
  TypeSocialBlockFields,
} from "./";

export interface TypePageFields {
  name: Contentful.EntryFields.Symbol;
  profile: Contentful.Entry<TypeProfileFields>;
  mainMenu: Contentful.Entry<TypeMenuFields>;
  socialLinks: Contentful.Entry<TypeSocialBlockFields>;
  seo?: Contentful.Entry<TypeSeoFields>;
}

export type TypePage = Contentful.Entry<TypePageFields>;
