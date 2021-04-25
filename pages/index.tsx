import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import useSWR from "swr";

import { fetcher } from "../services/api";
import Header from "./../components/Header";
import { LinksBlockProps } from "../components/LinksBlock";
import { AvatarProps } from "../components/Avatar";
import Modal from "../components/Modal";

interface indexProps {
  user: {
    avatar: AvatarProps;
    excerpt: string;
    html: string;
  };
  links: LinksBlockProps;
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
        <title>Welcome!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header
          avatar={avatar}
          html={data?.user.html}
          excerpt={data?.user.excerpt}
          links={data?.links}
        />
        <Modal showModal={showModal} onClose={handleModal} />
        <main>Conteudo</main>

        <footer>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Powered by Fixas
          </a>
        </footer>
      </div>
    </>
  );
};

export default Home;
