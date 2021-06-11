import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getArticleBySlug, getArticles, getWebsiteInfo } from "../../lib/api";
import { TypeArticle } from "../../lib/types";
import Menu, { MenuProps } from "../../components/Menu";
import CodeBlock from "../../components/CodeBlock";
import Footer from "../../components/Footer";
import { menuPropsConvert } from "../../lib/convertTypes";

interface ArticleProps {
  article: TypeArticle;
  menu: MenuProps;
}

const Article: React.FC<ArticleProps> = ({ article, menu }) => {
  const router = useRouter();

  if (!router.isFallback && !article) {
    return <ErrorPage statusCode={404} />;
  }

  if (router.isFallback) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      <Head>
        <title>I&apos;m Rafael Vieweg</title>
        <link rel="icon" href="/favicon.png" />
        {/**<meta name="description" content={user.excerpt} />**/}
      </Head>
      <div>
        <Menu {...menu} />
        <main className="flex flex-row flex-1 w-full my-12 justify-start flex-wrap pb-16">
          <div className="my-12 w-full px-6">
            {article.fields.heroImage && (
              <div className="hidden sm:block relative mb-12 h-96 mx-auto">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={`https:${article.fields.heroImage.fields.file.url}?h=250&w=1200&fit=fill`}
                  alt={article.fields.title}
                />
              </div>
            )}
            <div className="flex flex-row flex-wrap justify-between mx-auto max-w-fit">
              <article className="prose prose-red w-full sm:max-w-75ch text-lg leading-normal font-normal">
                <h1 className="text-6xl my-12 text-center text-blue-900">
                  {article.fields.title}
                </h1>
                <ReactMarkdown
                  rehypePlugins={[
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  ]}
                  components={{ code: CodeBlock }}
                >
                  {article.fields.body || ""}
                </ReactMarkdown>
              </article>
              <div className="sm:border-l sm:border-gray-200 ml-6 pl-6">
                <h3 className="text-2xl text-right font-bold">
                  Related articles
                </h3>
                <hr />
                <ul className="my-4 space-y-2">
                  <li>
                    <Link href="/">
                      <a className="text-indigo-600">Article test 1</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Article;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params && typeof params.slug === "string") {
    const websiteInfo = await getWebsiteInfo();
    const article = await getArticleBySlug(params.slug);
    if (article) {
      return {
        props: {
          menu: menuPropsConvert(websiteInfo.fields.mainMenu.fields),
          article,
        },
      };
    }
  }

  return {
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getArticles();

  const paths = articles.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return { paths, fallback: true };
};
