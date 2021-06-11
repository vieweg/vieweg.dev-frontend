import * as Contentful from "contentful";
import {
  TypeAuthorFields,
  TypeLandingPageFields,
  TypeTutorialFields,
} from "./";

export interface TypePageFields {
  title: Contentful.EntryFields.Symbol;
  slug: Contentful.EntryFields.Symbol;
  body: Contentful.EntryFields.Text;
  author: Contentful.Entry<TypeAuthorFields>;
  heroImage?: Contentful.Asset;
  description?: Contentful.EntryFields.Text;
  related?: Contentful.Entry<
    TypePageFields | TypeLandingPageFields | TypeTutorialFields
  >[];
  tags?: Contentful.EntryFields.Array<Contentful.EntryFields.Symbol>;
}

export type TypePage = Contentful.Entry<TypePageFields>;
