import React from "react";
import Head from "next/head";

import { getArticles, getWebsiteInfo } from "../../lib/api";
import Footer from "../../components/Footer";
import Menu, { MenuProps } from "../../components/Menu";

import ArticleHero from "../../components/ArticleHero";
import { TypeArticle } from "../../lib/types";

import { menuPropsConvert } from "../../lib/convertTypes";

interface indexProps {
  menu: MenuProps;
  articles: TypeArticle[];
}

const Articles: React.FC<indexProps> = ({ menu, articles }) => {
  return (
    <>
      <Head>
        <title>I&apos;m Rafael Vieweg</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="" />
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
    </>
  );
};

type PropsType = {
  props: indexProps;
  revalidate: number;
};

export default Articles;

export async function getStaticProps(): Promise<PropsType> {
  const websiteInfo = await getWebsiteInfo();
  const articles = await getArticles({
    skip: 0,
    limit: 10,
  });

  return {
    props: {
      menu: menuPropsConvert(websiteInfo.fields.mainMenu.fields),
      articles: articles.items,
    },
    revalidate: 60,
  };
}
