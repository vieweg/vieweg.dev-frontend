import * as Contentful from "contentful";
import { TypeMenuItemFields } from "./";

export interface TypeMenuFields {
  name: Contentful.EntryFields.Symbol;
  logo?: Contentful.Asset;
  theme?: Contentful.EntryFields.Symbol;
  leftItems?: Contentful.Entry<TypeMenuItemFields>[];
  centerItems?: Contentful.Entry<TypeMenuItemFields>[];
  rightItems?: Contentful.Entry<TypeMenuItemFields>[];
}

export type TypeMenu = Contentful.Entry<TypeMenuFields>;
