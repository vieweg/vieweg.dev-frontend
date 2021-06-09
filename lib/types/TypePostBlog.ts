import * as Contentful from "contentful";
import { TypeProfileFields } from "./";

export interface TypePostFields {
  title: Contentful.EntryFields.Symbol;
  slug: Contentful.EntryFields.Symbol;
  heroImage: Contentful.Asset;
  description: Contentful.EntryFields.Text;
  body: Contentful.EntryFields.Text;
  author?: Contentful.Entry<TypeProfileFields>;
  publishDate: Contentful.EntryFields.Date;
  relatedPages?: Contentful.Entry<TypePostFields>[];
  tags: Contentful.EntryFields.Array<Contentful.EntryFields.Symbol>;
}

export type TypePost = Contentful.Entry<TypePostFields>;
