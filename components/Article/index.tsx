import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface ArticleProps {
  id: string | number;
  href: string;
  title: string;
  isNew?: boolean;
  description?: string;
  thumb?: string;
  categories?: {
    id: string | number;
    title: string;
    href: string;
  }[];
}

const Article: React.FC<ArticleProps> = (props) => {
  return (
    <article className="w-full  md:w-1/2 lg:w-1/3 xl:1/4 ">
      <div className="relative m-3 p-4 border border-solid border-gray-200 rounded-xl shadow-inner overflow-hidden">
        {props.thumb && (
          <div className="relative h-48 mb-3">
            <Link href={props.href}>
              <a>
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={props.thumb}
                  className="hover:opacity-90"
                  alt={props.title}
                />
              </a>
            </Link>
          </div>
        )}

        <Link href={props.href}>
          <a title={props.title}>
            <h1 className="text-2xl font-bold text-gray-800 hover:opacity-80">
              {props.title}
            </h1>
            {props.description && (
              <p className="mt-3 line-clamp-3 text-gray-600 hover:opacity-80">
                {props.description}
              </p>
            )}
          </a>
        </Link>
        {props.categories &&
          props.categories.length > 0 &&
          props.categories.map((category) => {
            return (
              <div key={category.title} className="mt-2">
                <ul className="flex flex-row float-right flex-wrap">
                  <li className="text-xs text-gray-500 hover:text-gray-600 mr-2">
                    <Link href={category.href}>
                      <a>{category.title}</a>
                    </Link>
                  </li>
                </ul>
              </div>
            );
          })}

        {props.isNew && (
          <div
            className="absolute top-1 -right-11 transform rotate-30 shadow-md"
            style={{ background: "#96dc26" }}
          >
            <div className="w-36 text-center p-1">
              <span className="font-bold text-gray-800">New</span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default Article;
