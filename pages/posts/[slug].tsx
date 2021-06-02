import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "../../services/api";
import PostType from "../../types/post";
import Footer from "../../components/Footer";
import Menu, { MenuProps } from "../../components/Menu";
import UserType from "../../types/user";

//import PostBody from "../../components/PostBody";

import Markdown from "markdown-to-jsx";
import "highlight.js/styles/dracula.css";

import hljs from "highlight.js/lib/core";
import language from "highlight.js/lib/languages/javascript";

hljs.registerLanguage("javascript", language);

type PostProps = {
  post: PostType;
  user: UserType;
  menu: MenuProps;
  // morePosts: PostType[];
};

const Post: React.FC<PostProps> = ({ post, user, menu }) => {
  const router = useRouter();

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  if (router.isFallback) {
    return <div className="mx-auto">Loading...</div>;
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
          <div className="w-full  my-12 font-extrabold text-3xl text-gray-800">
            {post.thumb && (
              <div className="hidden sm:block relative w-5/6 h-96 mx-auto">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={post.thumb}
                  alt={post.title}
                />
              </div>
            )}
            <div className="my-12">
              <h1 className="text-3xl my-12 text-center">{post.title}</h1>
              <article className="prose prose-indigo max-w-3xl m-auto font-normal text-lg">
                <Markdown>{post.content || ""}</Markdown>
              </article>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await api.get(`/post/${params?.slug}`);
  const { data: userData } = await api.get<{ user: UserType; menu: MenuProps }>(
    "/user"
  );
  if (!userData || !post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post: post.data, user: userData.user, menu: userData.menu },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: postsData } = await api.get<PostType[]>("/posts");

  const paths = postsData.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths: paths, fallback: true };
};

export default Post;
