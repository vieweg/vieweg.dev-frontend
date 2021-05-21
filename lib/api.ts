import { api } from "../services/api";

type PostAndMorePosts = {
  slug: string;
};

export async function getPostAndMorePosts({
  slug,
}: PostAndMorePosts): Promise<void> {
  const post = await api.get(`/posts/${slug}`);
}
