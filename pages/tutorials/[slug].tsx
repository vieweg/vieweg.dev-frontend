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
import { getTutorialBySlug, getTutorials, getWebsiteInfo } from "../../lib/api";
import { TypeTutorial } from "../../lib/types";
import Menu, { MenuProps } from "../../components/Menu";
import CodeBlock from "../../components/CodeBlock";
import Footer from "../../components/Footer";
import { menuPropsConvert } from "../../lib/convertTypes";

interface ArticleProps {
  tutorial: TypeTutorial;
  menu: MenuProps;
}

const Tutorial: React.FC<ArticleProps> = ({ tutorial, menu }) => {
  const router = useRouter();

  if (!router.isFallback && !tutorial) {
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
            {tutorial.fields.heroImage && (
              <div className="hidden sm:block relative mb-12 h-96 mx-auto">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={`https:${tutorial.fields.heroImage.fields.file.url}?h=250&w=1200&fit=fill`}
                  alt={tutorial.fields.title}
                />
              </div>
            )}
            <div className="flex flex-row flex-wrap justify-between mx-auto max-w-fit">
              <div className="sm:border-r sm:border-gray-200 mr-6 pr-6">
                <h3 className="text-2xl text-left font-bold">Tutorial Parts</h3>
                <hr />
                <ul className="my-4 space-y-2">
                  <li>
                    <Link href="/">
                      <a className="text-indigo-600">Tutorial start</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a className="text-indigo-600">Tutorial start</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <article className="prose prose-indigo w-full sm:max-w-75ch text-lg leading-normal font-normal">
                <h1 className="text-6xl my-12 text-center text-blue-900">
                  {tutorial.fields.title}
                </h1>
                <ReactMarkdown
                  rehypePlugins={[
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  ]}
                  components={{ code: CodeBlock }}
                >
                  {tutorial.fields.body || ""}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Tutorial;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params && typeof params.slug === "string") {
    const websiteInfo = await getWebsiteInfo();
    const tutorial = await getTutorialBySlug(params.slug);
    if (tutorial) {
      return {
        props: {
          menu: menuPropsConvert(websiteInfo.fields.mainMenu.fields),
          tutorial,
        },
      };
    }
  }

  return {
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tutorials = await getTutorials();

  const paths = tutorials.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return { paths, fallback: true };
};
