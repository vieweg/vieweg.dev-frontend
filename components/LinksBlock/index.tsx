import React, { ComponentType, useCallback } from "react";
import { IconBaseProps } from "react-icons";
import { FiLink2 } from "react-icons/fi";

export interface LinksBlockProps {
  blockTitle?: string;
  cssClassTitle?: string;
  direction?: "column" | "row";
  showTitles?: boolean;
  links: {
    url: string;
    title: string;
    target?: "_blank" | "_self";
    icon?: ComponentType<IconBaseProps>;
    size?: number;
    classCssLink?: string;
    classCssIcon?: string;
    classCssTitle?: string;
  }[];
}

const LinksBlock: React.FC<LinksBlockProps> = (props) => {
  const defaults = {
    cssClassTitle: "text-center text-xl font-bold mb-2",
    links: {
      target: "_self",
      icon: FiLink2,
      size: 40,
      classCssLink: "text-red-400",
      classCssIcon: "text-red-400",
      classCssTitle: "ml-2 align-bottom",
    },
  };

  const cssClassBlock = useCallback(() => {
    if (props.direction && props.direction === "column") {
      return "flex flex-col space-y-4 justify-start";
    }
    return "flex flex-row space-x-4 justify-center items-end";
  }, [props.direction]);

  return (
    <div className="my-6 ">
      {props.blockTitle && (
        <div
          className={
            props.cssClassTitle ? props.cssClassTitle : defaults.cssClassTitle
          }
        >
          {props.blockTitle}
        </div>
      )}
      <div className={cssClassBlock()}>
        {props.links.map(
          (
            {
              title,
              url,
              icon: Icon = defaults.links.icon,
              size = defaults.links.size,
              target = defaults.links.target,
              classCssLink = defaults.links.classCssLink,
              classCssIcon = defaults.links.classCssIcon,
              classCssTitle = defaults.links.classCssTitle,
            },
            key
          ) => (
            <a
              key={key}
              title={title}
              href={url}
              target={target}
              className={classCssLink}
            >
              <div className="flex flex-row items-end">
                {Icon && <Icon size={size} className={classCssIcon} />}
                {props.showTitles && (
                  <span className={classCssTitle}>{title}</span>
                )}
              </div>
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default LinksBlock;
