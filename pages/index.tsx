import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import useSWR from "swr";

import { fetcher } from "../services/api";
import Header from "./../components/Header";
import { LinksBlockProps } from "../components/LinksBlock";
import { AvatarProps } from "../components/Avatar";
import Modal from "../components/Modal";
import Menu, { MenuProps } from "../components/Menu";
import { FaGithub } from "react-icons/fa";

interface indexProps {
  user: {
    avatar: AvatarProps;
    excerpt: string;
    html: string;
  };
  links: LinksBlockProps;
  menu: MenuProps;
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
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div>
        {data?.menu.title && data.menu.urlLogo && <Menu {...data?.menu} />}
        <Header
          avatar={avatar}
          html={data?.user.html}
          excerpt={data?.user.excerpt}
          links={data?.links}
        />

        <main className="flex flex-row flex-1 justify-between my-28 text-center">
          <div className="w-full sm:w-1/4 h-48 border border-solid border-gray-200 m-1.5 rounded">
            box
          </div>
          <div className="w-5/6 sm:w-1/4 h-48 border border-solid border-gray-200 m-1.5 rounded">
            box
          </div>
          <div className="w-5/6 sm:w-1/4  border border-solid border-gray-200 m-1.5 rounded">
            box
          </div>
          <div className="w-5/6 sm:w-1/4  border border-solid border-gray-200 m-1.5 rounded">
            box
          </div>
        </main>

        <footer className="w-full">
          <div className="text-center">
            <div className="flex flex-row w-auto m-auto justify-center items-center whitespace-pre-wrap">
              Get this code on{" "}
              <a
                href="https://github.com/vieweg/vieweg.dev"
                target="_blank"
                rel="noreferrer noopener"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </footer>
      </div>
      <Modal showModal={showModal} onClose={handleModal} />
    </>
  );
};

export default Home;
