import React from "react";
import Avatar, { AvatarProps } from "./../Avatar";
import LinksBlock, { LinksBlockProps } from "../LinksBlock";

export interface HeaderProps {
  excerpt: string;
  html: string;
  avatar: AvatarProps;
  links: LinksBlockProps;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="bg-gray-50 shadow-md overflow-hidden">
      <div className="mx-auto w-5/6">
        <div className="flex flex-col md:flex-row">
          <div className="m-2 self-center">
            <Avatar {...props.avatar} />
            <LinksBlock {...props.links} />
          </div>
          <div className="md:p-8">
            <div
              className="prose lg:prose-lg max-w-none prose-red"
              dangerouslySetInnerHTML={{ __html: props.excerpt }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
