import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
// import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "../../services/api";
import PostType from "../../types/post";
import Footer from "../../components/Footer";
import Menu, { MenuProps } from "../../components/Menu";
import UserType from "../../types/user";

type PostProps = {
  post: PostType;
  user: UserType;
  menu: MenuProps;
  // morePosts: PostType[];
};

const Post: React.FC<PostProps> = ({ post, user, menu }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
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
  const { data: postsData } = await api.get<{ posts: PostType[] }>("/posts");

  const paths = postsData.posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths: paths, fallback: true };
};

export default Post;
