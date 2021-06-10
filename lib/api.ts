import {
  ContentfulClientApi,
  createClient,
  Entry,
  EntryCollection,
} from "contentful";
import { CONTENT_TYPES_IDS, LANDINGPAGE_ID } from "./constants";
import { TypeArticleFields, TypeLandingPageFields } from "./types";

export const client = createClient({
  space: process.env.CF_SPACE_ID || "",
  accessToken: process.env.CF_ACCESS_TOKEN || "",
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
    "fields.slug": slug,
  });

  const entry = articles.items
    .filter((item) => item.fields.slug === slug)
    .pop();

  return entry;
}
