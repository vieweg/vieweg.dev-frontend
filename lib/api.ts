import {
  ContentfulClientApi,
  createClient,
  Entry,
  EntryCollection,
} from "contentful";
import { CONTENT_TYPES_IDS, LANDINGPAGE_ID } from "./constants";
import {
  TypeArticleFields,
  TypeLandingPageFields,
  TypePageFields,
  TypeTutorialFields,
} from "./types";

export const client = createClient({
  space: process.env.CF_SPACE_ID || "",
  accessToken: process.env.CF_ACCESS_TOKEN || "",
  environment: "dev",
});

const previewClient = createClient({
  space: process.env.CF_SPACE_ID || "",
  accessToken: process.env.CF_PREVIEW_ACCESS_TOKEN || "",
  host: "preview.contentful.com",
});

const getClient = (preview: boolean): ContentfulClientApi =>
  preview ? previewClient : client;

export async function getWebsiteInfo(): Promise<Entry<TypeLandingPageFields>> {
  const landinPage = await getClient(false).getEntry<TypeLandingPageFields>(
    LANDINGPAGE_ID,
    {
      include: 10,
    }
  );
  return landinPage;
}

/*
 * Articles data fetch methods
 * ---------------------------
 */

interface GetArticlesProps {
  [key: string]: string | number;
}

export async function getArticles(
  args?: GetArticlesProps
): Promise<EntryCollection<TypeArticleFields>> {
  const query = {
    include: 10,
    order: "-sys.createdAt",
    ...args,
    content_type: CONTENT_TYPES_IDS.article,
  };

  const posts = await getClient(false).getEntries<TypeArticleFields>(query);

  return posts;
}

export async function getArticleBySlug(
  slug: string
): Promise<Entry<TypeArticleFields> | undefined> {
  const articles = await getClient(false).getEntries<TypeArticleFields>({
    content_type: CONTENT_TYPES_IDS.article,
    include: 10,
    "fields.slug": slug,
  });

  const entry = articles.items
    .filter((item) => item.fields.slug === slug)
    .pop();

  return entry;
}

/*
 * Pages data fetch methods
 * -----------------------
 */
interface GetPagesProps {
  [key: string]: string | number;
}

export async function getPages(
  args?: GetPagesProps
): Promise<EntryCollection<TypePageFields>> {
  const query = {
    include: 10,
    order: "-sys.createdAt",
    ...args,
    content_type: CONTENT_TYPES_IDS.page,
  };

  const pages = await getClient(false).getEntries<TypePageFields>(query);

  return pages;
}

export async function getPageBySlug(
  slug: string
): Promise<Entry<TypePageFields> | undefined> {
  const page = await getClient(false).getEntries<TypePageFields>({
    content_type: CONTENT_TYPES_IDS.page,
    include: 10,
    "fields.slug": slug,
  });

  const entry = page.items.filter((item) => item.fields.slug === slug).pop();

  return entry;
}

/*
 * Tutorials data fetch methods
 * ---------------------------
 */

interface GetTutorialsProps {
  [key: string]: string | number;
}

export async function getTutorials(
  args?: GetTutorialsProps
): Promise<EntryCollection<TypeTutorialFields>> {
  const query = {
    include: 10,
    order: "-sys.createdAt",
    ...args,
    content_type: CONTENT_TYPES_IDS.tutorial,
  };

  const tutorials = await getClient(false).getEntries<TypeTutorialFields>(
    query
  );

  return tutorials;
}

export async function getTutorialBySlug(
  slug: string
): Promise<Entry<TypeTutorialFields> | undefined> {
  const tutorials = await getClient(false).getEntries<TypeTutorialFields>({
    content_type: CONTENT_TYPES_IDS.tutorial,
    include: 10,
    "fields.slug": slug,
  });

  const entry = tutorials.items
    .filter((item) => item.fields.slug === slug)
    .pop();

  return entry;
}
