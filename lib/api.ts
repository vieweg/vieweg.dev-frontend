import { ContentfulClientApi, createClient, EntryCollection } from "contentful";
import { CONTENT_TYPES_IDS } from "./constants";
import { TypePageFields } from "./types";

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

export async function getInitialProps(): Promise<
  EntryCollection<TypePageFields>
> {
  return await getClient(false).getEntries<TypePageFields>({
    content_type: CONTENT_TYPES_IDS.LandingPage,
    include: 5,
  });
}
