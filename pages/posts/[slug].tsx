import React from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PostType from "../../types/post";
import { api } from "../../services/api";
import Footer from "../../components/Footer";
import Head from "next/head";
import Menu, { MenuProps } from "../../components/Menu";
import UserType from "../../types/user";
import Image from "next/image";

type PostProps = {
  post: PostType;
  user: UserType;
  menu: MenuProps;
  // morePosts: PostType[];
};

const Post: React.FC<PostProps> = ({ post, user, menu }) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>I&apos;m Rafael Vieweg</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={user.excerpt} />
      </Head>
      <div>
        <Menu {...menu} />

        <main className="flex flex-row flex-1 justify-start flex-wrap pb-16">
          <div className="w-full text-center my-12 font-extrabold text-3xl text-gray-800">
            {post.thumb && (
              <div className="relative w-5/6 h-96 mx-auto">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={post.thumb}
                  alt={post.title}
                />
              </div>
            )}
            {post.title}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

type ParamsType = {
  params: {
    slug: string;
  };
};

type PropsType = {
  props: PostProps;
};

type PathsType = {
  paths: ParamsType[];
  fallback: boolean;
};

export async function getStaticProps({
  params,
}: ParamsType): Promise<PropsType> {
  const post = await api.get(`/post/${params.slug}`);
  const { user, menu } = (
    await api.get<{ user: UserType; menu: MenuProps }>("/user")
  ).data;

  return { props: { post: post.data, user, menu } };
}

export async function getStaticPaths(): Promise<PathsType> {
  const { posts } = (await api.get<{ posts: PostType[] }>("/posts")).data;

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export default Post;
