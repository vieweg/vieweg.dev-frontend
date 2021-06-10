import React, { useMemo } from "react";

export interface LinksBlockProps {
  blockTitle?: string;
  cssClassTitle?: string;
  direction?: "column" | "row";
  showTitles?: boolean;
  links: {
    id: string;
    url: string;
    title: string;
    target?: "_blank" | "_self" | string;
    svgIcon?: string;
    classCssTitle?: string;
    classCssLink?: string;
    classCssIcon?: string;
  }[];
}

const defaults = {
  ClassCssTitle: "text-center text-xl font-bold mb-2",
  links: {
    target: "_self",
    svgIcon:
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" /></svg>',
    classCssTitle: "ml-2 align-bottom",
    classCssLink: "p-2.5 text-red-400",
    classCssIcon: "text-gray-500 w-6 h-6",
  },
};

const LinksBlock: React.FC<LinksBlockProps> = (props) => {
  const cssClassBlock = useMemo(() => {
    if (props.direction && props.direction === "column") {
      return "flex flex-col space-y-4 justify-start";
    }
    return "flex flex-row justify-center items-end";
  }, [props.direction]);

  if (!props.links || props.links.length <= 0) {
    return null;
  }

  return (
    <div className="my-4">
      {props.showTitles && (
        <div
          className={
            props.cssClassTitle ? props.cssClassTitle : defaults.ClassCssTitle
          }
        >
          {props.blockTitle}
        </div>
      )}
      <div className={cssClassBlock}>
        {props.links.map(
          ({
            id,
            title,
            url,
            svgIcon = defaults.links.svgIcon,
            target = defaults.links.target,
            classCssLink = defaults.links.classCssLink,
            classCssIcon = defaults.links.classCssIcon,
            classCssTitle = defaults.links.classCssTitle,
          }) => (
            <a
              key={id}
              title={title}
              href={url}
              target={target}
              rel={target === "_blank" ? "noopener noreferrer" : ""}
              className={classCssLink}
            >
              <div className="flex flex-row items-end">
                {svgIcon && (
                  <div className={classCssIcon}>
                    <i dangerouslySetInnerHTML={{ __html: svgIcon }} />
                  </div>
                )}
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
