import React from "react";
import Head from "next/head";

import { getTutorials, getWebsiteInfo } from "../../lib/api";
import Footer from "../../components/Footer";
import Menu, { MenuProps } from "../../components/Menu";

import ArticleHero from "../../components/ArticleHero";
import { TypeTutorial } from "../../lib/types";

import { menuPropsConvert } from "../../lib/convertTypes";

interface indexProps {
  menu: MenuProps;
  tutorials: TypeTutorial[];
}

const Tutorials: React.FC<indexProps> = ({ menu, tutorials }) => {
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
            Latest tutorials
          </div>
          {tutorials &&
            tutorials.length > 0 &&
            tutorials.map((tutorial) => {
              return (
                <ArticleHero
                  key={tutorial.sys.id}
                  title={tutorial.fields.title}
                  slug={`/tutorials/${tutorial.fields.slug}`}
                  heroImage={tutorial.fields.heroImage}
                  description={tutorial.fields.description}
                  tags={tutorial.fields.tags}
                  author={tutorial.fields.author}
                  createdAt={tutorial.sys.createdAt}
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

export default Tutorials;

export async function getStaticProps(): Promise<PropsType> {
  const websiteInfo = await getWebsiteInfo();
  const tutorials = await getTutorials({
    skip: 0,
    limit: 10,
  });

  return {
    props: {
      menu: menuPropsConvert(websiteInfo.fields.mainMenu.fields),
      tutorials: tutorials.items,
    },
    revalidate: 60,
  };
}
