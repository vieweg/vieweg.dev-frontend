import React, { useCallback, useState } from "react";
import Head from "next/head";

import { getArticles, getWebsiteInfo } from "../../lib/api";
import Modal from "../../components/Modal";
import Footer from "../../components/Footer";
import Menu, { MenuProps } from "../../components/Menu";
import { AvatarProps } from "../../components/Avatar";
import { LinksBlockProps } from "../../components/LinksBlock";
import ArticleHero from "../../components/ArticleHero";
import { TypeArticle } from "../../lib/types";

import {
  avatarPropsConvert,
  menuPropsConvert,
  socialLinksPropsConvert,
} from "../../lib/convertTypes";

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

const Home: React.FC<indexProps> = ({ user, menu, articles }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = useCallback(() => {
    setShowModal((s) => !s);
  }, []);

  return (
    <>
      <Head>
        <title>I&apos;m Rafael Vieweg</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={user.shortBio} />
      </Head>
      <div>
        <Menu {...menu} />

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
                  slug={article.fields.slug}
                  heroImage={article.fields.heroImage}
                  description={article.fields.description}
                  tags={article.fields.tags}
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
