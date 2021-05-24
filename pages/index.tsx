import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";

import { api } from "../services/api";
import Header from "./../components/Header";
import Menu, { MenuProps } from "../components/Menu";
import { AvatarProps } from "../components/Avatar";
import { LinksBlockProps } from "../components/LinksBlock";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import Article from "../components/Article";
import PostType from "../types/post";
import UserType from "../types/user";

interface indexProps {
  user: UserType;
  links: LinksBlockProps;
  menu: MenuProps;
  posts: PostType[];
}

const Home: React.FC<indexProps> = ({ posts, user, links, menu }) => {
  const [avatar, setAvatar] = useState<AvatarProps | false>(false);
  const [showModal, setShowModal] = useState(false);

  const handleModal = useCallback(() => {
    // setShowModal((s) => !s);
    setShowModal(false);
  }, []);

  useEffect(() => {
    if (user && user.avatar) {
      setAvatar({ onCLick: handleModal, ...user.avatar });
    }
  }, [user, handleModal]);

  return (
    <>
      <Head>
        <title>I&apos;m Rafael Vieweg</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={user.excerpt} />
      </Head>
      <div>
        <Menu {...menu} />
        <Header
          avatar={avatar}
          html={user.html}
          excerpt={user.excerpt}
          links={links}
        />

        <main className="flex flex-row flex-1 justify-start flex-wrap pb-16">
          <div className="w-full text-center my-12 font-extrabold text-3xl text-gray-800">
            Latest Articles
          </div>
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              return (
                <Article
                  key={post.id}
                  id={post.id}
                  href={`/posts/${post.slug}`}
                  thumb={post.thumb}
                  title={post.title}
                  description={post.description}
                  categories={post.categories}
                  isNew={post.isNew}
                />
              );
            })}
        </main>

        <Footer />
      </div>
      <Modal showModal={showModal} onClose={handleModal} />
    </>
  );
};

type PropsType = {
  props: indexProps;
};

export async function getStaticProps(): Promise<PropsType> {
  const { data: postsData } = await api.get<Pick<indexProps, "posts">>(
    "/posts"
  );
  const { data: userData } = await api.get<Omit<indexProps, "posts">>("/user");

  return {
    props: {
      posts: postsData.posts || [],
      user: userData.user,
      links: userData.links,
      menu: userData.menu,
    },
  };
}

export default Home;
