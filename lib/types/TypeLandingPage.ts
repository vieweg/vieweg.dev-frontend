import * as Contentful from "contentful";
import { TypeMenuFields, TypeAuthorFields, TypeSocialBlockFields } from "./";

export interface TypeLandingPageFields {
  name: Contentful.EntryFields.Symbol;
  author: Contentful.Entry<TypeAuthorFields>;
  mainMenu: Contentful.Entry<TypeMenuFields>;
  socialLinks: Contentful.Entry<TypeSocialBlockFields>;
}

export type TypeLandingPage = Contentful.Entry<TypeLandingPageFields>;
