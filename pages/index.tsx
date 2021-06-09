import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";

import { getInitialProps, getLastPosts } from "../lib/api";
import Header from "./../components/Header";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import Menu, { MenuProps } from "../components/Menu";
import { AvatarProps } from "../components/Avatar";
import { LinksBlockProps } from "../components/LinksBlock";
import { TypePost } from "../lib/types";

import {
  avatarPropsConvert,
  menuPropsConvert,
  socialLinksPropsConvert,
} from "../lib/convertTypes";
import PostHero from "../components/PostHero";

interface indexProps {
  user: {
    avatar?: AvatarProps;
    shortBio?: string;
    longBio?: string;
  };
  socialLinks: LinksBlockProps;
  menu: MenuProps;
  posts: TypePost[];
}

const Home: React.FC<indexProps> = ({ user, socialLinks, menu, posts }) => {
  const [avatar, setAvatar] = useState<AvatarProps | undefined>();
  const [showModal, setShowModal] = useState(false);

  const handleModal = useCallback(() => {
    setShowModal((s) => !s);
  }, []);

  useEffect(() => {
    user &&
      user.avatar &&
      setAvatar({
        ...user.avatar,
        onCLick: handleModal,
      });
  }, [user, handleModal]);

  return (
    <>
      <Head>
        <title>I&apos;m Rafael Vieweg</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={user.shortBio} />
      </Head>
      <div>
        <Menu {...menu} />
        <Header
          avatar={avatar}
          links={socialLinks}
          html={user.longBio}
          excerpt={user.shortBio}
        />

        <main className="flex flex-row flex-1 justify-start flex-wrap pb-16">
          <div className="w-full text-center my-12 font-extrabold text-3xl text-gray-800">
            Latest Articles
          </div>
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              return (
                <PostHero
                  key={post.sys.id}
                  title={post.fields.title}
                  slug={post.fields.slug}
                  heroImage={post.fields.heroImage}
                  description={post.fields.description}
                  tags={post.fields.tags}
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
  revalidate: number;
};

export default Home;

export async function getStaticProps(): Promise<PropsType> {
  const initialProps = await getInitialProps();
  const posts = await getLastPosts();

  const [data] = initialProps.items.map((page) => {
    const user = page.fields.profile.fields;
    const links = page.fields.socialLinks.fields;
    const menu = page.fields.mainMenu.fields;
    return { user, links, menu };
  });

  return {
    props: {
      user: {
        ...data.user,
        avatar: avatarPropsConvert(data.user),
      },
      socialLinks: socialLinksPropsConvert(data.links),
      menu: menuPropsConvert(data.menu),
      posts: posts.items,
    },
    revalidate: 60,
  };
}
