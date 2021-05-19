import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import useSWR from "swr";

import { fetcher } from "../services/api";
import Header from "./../components/Header";
import { LinksBlockProps } from "../components/LinksBlock";
import { AvatarProps } from "../components/Avatar";
import Modal from "../components/Modal";
import Menu, { MenuProps } from "../components/Menu";
import Footer from "../components/Footer";
import Article, { ArticleProps } from "../components/Article";

interface indexProps {
  user: {
    avatar: AvatarProps;
    excerpt: string;
    html: string;
  };
  links: LinksBlockProps;
  menu: MenuProps;
  articles: ArticleProps[];
}

const Home: React.FC = () => {
  const [avatar, setAvatar] = useState<AvatarProps | false>(false);
  const [showModal, setShowModal] = useState(false);
  const { data } = useSWR<indexProps>("/api/user", fetcher);

  const handleModal = useCallback(() => {
    setShowModal((s) => !s);
  }, []);

  useEffect(() => {
    if (data?.user && data.user.avatar) {
      setAvatar({ onCLick: handleModal, ...data.user.avatar });
    }
  }, [data, handleModal]);

  return (
    <>
      <Head>
        <title>I&apos;m Rafael Vieweg</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={data?.user.excerpt} />
      </Head>
      <div>
        <Menu {...data?.menu} />
        <Header
          avatar={avatar}
          html={data?.user.html}
          excerpt={data?.user.excerpt}
          links={data?.links}
        />

        <main className="flex flex-row flex-1 justify-start flex-wrap pb-16">
          <div className="w-full text-center my-12 font-extrabold text-3xl text-gray-800">
            Latest Articles
          </div>
          {data &&
            data.articles.length > 0 &&
            data.articles.map((article) => {
              return (
                <Article
                  key={article.id}
                  id={article.id}
                  href={article.href}
                  thumb={article.thumb}
                  title={article.title}
                  description={article.description}
                  categories={article.categories}
                  isNew={article.isNew}
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

export default Home;
