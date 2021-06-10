import * as Contentful from "contentful";

export interface TypeSocialLinksFields {
  title: Contentful.EntryFields.Symbol;
  url: Contentful.EntryFields.Symbol;
  target: Contentful.EntryFields.Symbol;
  svgIcon: Contentful.EntryFields.Symbol;
  classCssTitle: Contentful.EntryFields.Symbol;
  classCssLink: Contentful.EntryFields.Symbol;
  classCssIcon: Contentful.EntryFields.Symbol;
}

export type TypeSocialLinks = Contentful.Entry<TypeSocialLinksFields>;
