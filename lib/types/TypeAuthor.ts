import * as Contentful from "contentful";

export interface TypeAuthorFields {
  name: Contentful.EntryFields.Symbol;
  title?: Contentful.EntryFields.Symbol;
  avatar?: Contentful.Asset;
  avatarSize?: Contentful.EntryFields.Integer;
  avatarNews?: Contentful.EntryFields.Boolean;
  avatarTag?: Contentful.EntryFields.Symbol;
  shortBio?: Contentful.EntryFields.Symbol;
  longBio?: Contentful.EntryFields.Text;
  email?: Contentful.EntryFields.Symbol;
  phone?: Contentful.EntryFields.Symbol;
}

export type TypeAuthor = Contentful.Entry<TypeAuthorFields>;
