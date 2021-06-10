import { AvatarProps } from "../components/Avatar";
import { LinksBlockProps } from "../components/LinksBlock";
import { MenuProps, LinkProps } from "../components/Menu";
import {
  TypeMenuFields,
  TypeMenuItem,
  TypeAuthorFields,
  TypeSocialBlockFields,
} from "../lib/types";

export function avatarPropsConvert(props: TypeAuthorFields): AvatarProps {
  const url = "https:" + props.avatar?.fields.file.url;
  const newStories = props.avatarNews;
  const alt = props.name;
  const size = props.avatarSize;
  const tag = props.avatarTag;

  return {
    url,
    alt,
    ...(newStories && { newStories }),
    ...(size && { size }),
    ...(tag && { tag }),
  };
}

export function socialLinksPropsConvert(
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
        ...(link.fields.target && { target: link.fields.target }),
        ...(link.fields.svgIcon && { svgIcon: link.fields.svgIcon }),
        ...(link.fields.classCssTitle && {
          classCssTitle: link.fields.classCssTitle,
        }),
        ...(link.fields.classCssLink && {
          classCssLink: link.fields.classCssLink,
        }),
        ...(link.fields.classCssIcon && {
          classCssIcon: link.fields.classCssIcon,
        }),
      };
    });

  return {
    ...(blockTitle && { blockTitle }),
    ...(cssClassTitle && { cssClassTitle }),
    ...(showTitles && { showTitles }),
    direction,
    links,
  };
}

export function menuPropsConvert(props: TypeMenuFields): MenuProps {
  const itemPropsConvert = (items: TypeMenuItem[]): LinkProps[] => {
    return items.map((item) => {
      return {
        id: item.sys.id,
        href: item.fields.href,
        title: item.fields.title,
        colorMode: isDark ? "dark" : "default",
        ...(item.fields.svgIcon && { svgIcon: item.fields.svgIcon }),
        ...(item.fields.description && {
          description: item.fields.description,
        }),
        ...(item.fields.target && { target: item.fields.target }),
        ...(item.fields.items && {
          items: itemPropsConvert(item.fields.items),
        }),
      };
    });
  };

  const isDark = props.theme === "dark";
  const logo = {
    url: "https:" + props.logo?.fields.file.url,
    href: "/",
    ...(props.logo?.fields.description && {
      alt: props.logo?.fields.description,
    }),
    ...(props.logo?.fields.title && { title: props.logo?.fields.title }),
    ...(props.logo?.fields.file.details.image?.width && {
      width: props.logo?.fields.file.details.image?.width,
    }),
    ...(props.logo?.fields.file.details.image?.height && {
      height: props.logo?.fields.file.details.image?.height,
    }),
  };
  const leftItems = props.leftItems && itemPropsConvert(props.leftItems);
  const centerItems = props.centerItems && itemPropsConvert(props.centerItems);
  const rightItems = props.rightItems && itemPropsConvert(props.rightItems);

  return {
    logo,
    isDark,
    ...(leftItems && { leftItems }),
    ...(centerItems && { centerItems }),
    ...(rightItems && { rightItems }),
  };
}
