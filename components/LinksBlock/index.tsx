import React, {
  ComponentType,
  isValidElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IconBaseProps } from "react-icons";
import * as fa from "react-icons/fa";

export interface LinksBlockProps {
  blockTitle?: string;
  cssClassTitle?: string;
  direction?: "column" | "row";
  showTitles?: boolean;
  links: [
    {
      url: string;
      title: string;
      target?: "_blank" | "_self";
      icon?: ComponentType<IconBaseProps>;
      size?: number;
      classCssLink?: string;
      classCssIcon?: string;
      classCssTitle?: string;
    }
  ];
}

const defaults = {
  cssClassTitle: "text-center text-xl font-bold mb-2",
  links: {
    target: "_self",
    icon: fa["FaLink"],
    size: 40,
    classCssLink: "text-red-400",
    classCssIcon: "text-red-400",
    classCssTitle: "ml-2 align-bottom",
  },
};

const LinksBlock: React.FC<LinksBlockProps> = (props) => {
  const [linksProps, setLinksProps] = useState<LinksBlockProps>(
    {} as LinksBlockProps
  );

  useEffect(() => {
    async function handleIcons(): Promise<void> {
      if (props.links && props.links.length > 0) {
        const linksFormatted = { ...props };
        for await (const ln of linksFormatted.links) {
          if (
            ln.icon &&
            !isValidElement(ln.icon) &&
            typeof ln.icon === "string"
          ) {
            // eslint-disable-next-line
            ln.icon = fa[ln.icon];
          }
          //ln.icon = await require(`@react-icons/all-files/fa/${ln.icon}`);
        }
        setLinksProps({ ...linksFormatted });
      }
    }
    handleIcons();
  }, [props]);

  const cssClassBlock = useCallback(() => {
    if (props.direction && props.direction === "column") {
      return "flex flex-col space-y-4 justify-start";
    }
    return "flex flex-row space-x-4 justify-center items-end";
  }, [props.direction]);

  if (!linksProps.links || linksProps.links.length <= 0) {
    return null;
  }

  return (
    <div className="my-6 ">
      {linksProps.blockTitle && (
        <div
          className={
            linksProps.cssClassTitle
              ? linksProps.cssClassTitle
              : defaults.cssClassTitle
          }
        >
          {linksProps.blockTitle}
        </div>
      )}
      <div className={cssClassBlock()}>
        {linksProps.links.map(
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
