import * as Contentful from "contentful";
import { TypeSocialLinksFields } from "./";

export interface TypeSocialBlockFields {
  blockTitle: Contentful.EntryFields.Symbol;
  direction: Contentful.EntryFields.Symbol;
  showTitle: Contentful.EntryFields.Boolean;
  classCssTitle: Contentful.EntryFields.Symbol;
  links: Contentful.Entry<TypeSocialLinksFields>[];
}

export type TypeSocialBlock = Contentful.Entry<TypeSocialBlockFields>;
