import * as Contentful from "contentful";

export interface TypeMenuItemFields {
  title: Contentful.EntryFields.Symbol;
  href: Contentful.EntryFields.Symbol;
  svgIcon?: Contentful.EntryFields.Symbol;
  description?: Contentful.EntryFields.Symbol;
  target?: Contentful.EntryFields.Symbol;
  items?: Contentful.Entry<TypeMenuItemFields>[];
}

export type TypeMenuItem = Contentful.Entry<TypeMenuItemFields>;
