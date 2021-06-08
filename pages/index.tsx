import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";

import { getInitialProps } from "../lib/api";
import Header from "./../components/Header";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import Menu, { LinkProps, MenuProps } from "../components/Menu";
import { AvatarProps } from "../components/Avatar";
import { LinksBlockProps } from "../components/LinksBlock";
// import Article from "../components/Article";
// import PostType from "../types/post";
import {
  TypeMenuFields,
  TypeMenuItem,
  TypeProfileFields,
  TypeSocialBlockFields,
} from "../lib/types";

interface indexProps {
  user: TypeProfileFields;
  links: TypeSocialBlockFields;
  menuData: TypeMenuFields;
  // posts: PostType[];
}

const Home: React.FC<indexProps> = ({ user, links, menuData }) => {
  const [avatar, setAvatar] = useState<AvatarProps | undefined>();
  const [socialLinks, setSocialLinks] = useState<LinksBlockProps>();
  const [menu, setMenu] = useState<MenuProps>({});
  const [showModal, setShowModal] = useState(false);

  const handleModal = useCallback(() => {
    // setShowModal((s) => !s);
    setShowModal(false);
  }, []);

  useEffect(() => {
    user &&
      user.avatar &&
      setAvatar({
        ...avatarPropsConvert(user),
        onCLick: handleModal,
      });
    links && setSocialLinks({ ...socialLinksPropsConvert(links) });
    menuData && setMenu({ ...menuPropsConvert(menuData) });
  }, [user, links, menuData, handleModal]);

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
  const initialProps = await getInitialProps();

  const [data] = initialProps.items.map((page) => {
    const user = page.fields.profile.fields;
    const links = page.fields.socialLinks.fields;
    const menu = page.fields.mainMenu.fields;
    return { user, links, menu };
  });

  return {
    props: {
      user: data.user,
      links: data.links,
      menuData: data.menu,
    },
  };
}

export default Home;

function avatarPropsConvert(props: TypeProfileFields): AvatarProps {
  const url = "https:" + props.avatar?.fields.file.url;
  const newStories = props.avatarNews;
  const alt = props.name;
  const size = props.avatarSize;
  const tag = props.avatarTag;

  return { url, newStories, alt, size, tag };
}

function socialLinksPropsConvert(
  props: TypeSocialBlockFields
): LinksBlockProps {
  const blockTitle = props.blockTitle;
  const cssClassTitle = props.classCssTitle;
  const direction = props.direction === "column" ? "column" : "row";
  const showTitles = props.showTitle;
  const links =
    props.links &&
    props.links.map((link) => {
      return {
        id: link.sys.id,
        url: link.fields.url,
        title: link.fields.title,
        target: link.fields.target,
        svgIcon: link.fields.svgIcon,
        classCssTitle: link.fields.classCssTitle,
        classCssLink: link.fields.classCssLink,
        classCssIcon: link.fields.classCssIcon,
      };
    });

  return { blockTitle, cssClassTitle, direction, showTitles, links };
}

function menuPropsConvert(props: TypeMenuFields): MenuProps {
  const itemPropsConvert = (items: TypeMenuItem[]): LinkProps[] => {
    return items.map((item) => {
      return {
        id: item.sys.id,
        svgIcon: item.fields.svgIcon,
        href: item.fields.href,
        title: item.fields.title,
        description: item.fields.description,
        colorMode: isDark ? "dark" : "default",
        target: item.fields.target,
        items: item.fields.items && itemPropsConvert(item.fields.items),
      };
    });
  };

  const isDark = props.theme === "dark";
  const logo = {
    url: "https:" + props.logo?.fields.file.url,
    alt: props.logo?.fields.description,
    title: props.logo?.fields.title,
    href: "/",
    width: props.logo?.fields.file.details.image?.width,
    height: props.logo?.fields.file.details.image?.height,
  };
  const leftItems = props.leftItems && itemPropsConvert(props.leftItems);
  const centerItems = props.centerItems && itemPropsConvert(props.centerItems);
  const rightItems = props.rightItems && itemPropsConvert(props.rightItems);

  return { isDark, logo, leftItems, centerItems, rightItems };
}
