import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";

import { getWebsiteInfo, getArticles } from "../lib/api";
import Header from "./../components/Header";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import Menu, { MenuProps } from "../components/Menu";
import { AvatarProps } from "../components/Avatar";
import { LinksBlockProps } from "../components/LinksBlock";
import ArticleHero from "../components/ArticleHero";
import { TypeArticle } from "../lib/types";

import {
  avatarPropsConvert,
  menuPropsConvert,
  socialLinksPropsConvert,
} from "../lib/convertTypes";

interface indexProps {
  user: {
    avatar?: AvatarProps;
    shortBio?: string;
    longBio?: string;
  };
  socialLinks: LinksBlockProps;
  menu: MenuProps;
  articles: TypeArticle[];
}

const Home: React.FC<indexProps> = ({ user, socialLinks, menu, articles }) => {
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
          {articles &&
            articles.length > 0 &&
            articles.map((article) => {
              return (
                <ArticleHero
                  key={article.sys.id}
                  title={article.fields.title}
                  slug={`/articles/${article.fields.slug}`}
                  heroImage={article.fields.heroImage}
                  description={article.fields.description}
                  tags={article.fields.tags}
                  author={article.fields.author}
                  createdAt={article.sys.createdAt}
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
  const websiteInfo = await getWebsiteInfo();
  const articles = await getArticles({
    skip: 0,
    limit: 10,
  });

  return {
    props: {
      user: {
        ...websiteInfo.fields.author.fields,
        avatar: avatarPropsConvert(websiteInfo.fields.author.fields),
      },
      socialLinks: socialLinksPropsConvert(
        websiteInfo.fields.socialLinks.fields
      ),
      menu: menuPropsConvert(websiteInfo.fields.mainMenu.fields),
      articles: articles.items,
    },
    revalidate: 60,
  };
}
