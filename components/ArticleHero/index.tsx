import Image from "next/image";
import Link from "next/link";
import React from "react";

import { TypeArticleFields } from "../../lib/types";

interface ArticleHeroProps
  extends Pick<
    TypeArticleFields,
    "heroImage" | "slug" | "title" | "description" | "tags" | "author"
  > {
  createdAt: string;
}
const ArticleHero: React.FC<ArticleHeroProps> = ({
  title,
  slug,
  heroImage,
  description,
  createdAt,
  author,
}) => {
  const dataFormated = new Date(createdAt).toLocaleDateString("en-UK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const isNew =
    new Date().getDate() - new Date(createdAt).getDate() < 21 ? true : false; //Less 21 days ago

  return (
    <article className="w-full  md:w-1/2 lg:w-1/3 xl:1/4 ">
      <div className="relative m-3 p-4 border border-solid border-gray-200 rounded-xl shadow-inner overflow-hidden">
        {heroImage && heroImage.fields.file && (
          <div className="relative h-48 mb-3">
            <Link href={`${slug}`}>
              <a>
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={`https:${heroImage.fields.file.url}?fit=thumb&f=center&h=200&w=600`}
                  className="hover:opacity-90"
                  alt={title}
                />
              </a>
            </Link>
          </div>
        )}

        <Link href={`${slug}`}>
          <a title={title}>
            <h1 className="text-2xl font-bold text-gray-800 hover:opacity-80">
              {title}
            </h1>
            {description && (
              <p className="mt-3 line-clamp-3 text-gray-600 hover:opacity-80">
                {description}
              </p>
            )}
          </a>
        </Link>

        <div className="w-full text-right pr-4 mt-2 text-gray-300">
          <small>
            {dataFormated} - {author.fields.name}
          </small>
        </div>
        {isNew && (
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

export default ArticleHero;
