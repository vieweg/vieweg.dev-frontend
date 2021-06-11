import * as Contentful from "contentful";
import { TypeArticleFields } from "./TypeArticle";

export interface TypeTutorialFields extends TypeArticleFields {
  related?: Contentful.Entry<TypeTutorialFields>[];
}

export type TypeTutorial = Contentful.Entry<TypeTutorialFields>;
