import Image from "next/image";
import Link from "next/link";
import React from "react";

import { TypeArticleFields } from "../../lib/types";

type ArticleHeroProps = Pick<
  TypeArticleFields,
  "heroImage" | "slug" | "title" | "description" | "tags" | "author"
>;

const ArticleHero: React.FC<ArticleHeroProps> = (props) => {
  return (
    <article className="w-full  md:w-1/2 lg:w-1/3 xl:1/4 ">
      <div className="relative m-3 p-4 border border-solid border-gray-200 rounded-xl shadow-inner overflow-hidden">
        {props.heroImage.fields && props.heroImage.fields.file && (
          <div className="relative h-48 mb-3">
            <Link href={`/posts/${props.slug}`}>
              <a>
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={`https:${props.heroImage.fields.file.url}?fit=thumb&f=center&h=200&w=600`}
                  className="hover:opacity-90"
                  alt={props.title}
                />
              </a>
            </Link>
          </div>
        )}

        <Link href={`/posts/${props.slug}`}>
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
        {false && (
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
