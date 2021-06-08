type PostType = {
  id: string;
  slug: string;
  title: string;
  thumb?: string;
  description?: string;
  content?: string;
  categories?: {
    id: string | number;
    title: string;
    href: string;
  }[];
  isNew?: boolean;
};

export default PostType;
