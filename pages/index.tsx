import Head from "next/head";
import Header from "./../components/Header";
import { RiAccountBoxFill, RiFacebookBoxFill } from "react-icons/ri";
import { LinksBlockProps } from "../components/LinksBlock";

export default function Home(): JSX.Element {
  const excerpt =
    "<h1>Hello!</h1><h3>I'm Rafael Vieweg</h3><p>I'm a Brazilian software developer and am currently based in London. With more than 12 years of experience in developing systems and web applications.</p>";

  const html =
    "<h1>Hello!</h1><h3>I'm Rafael Vieweg</h3><p>I'm a Brazilian software developer and am currently based in London. With more than 12 years of experience in developing systems and web applications.</p><p> I'm a full stack developer, working mainly with PHP, using the Symfony Framework, Wordpress and the entire ecosystem involved (HTML, CSS, MYSQL, JS ...), I am an attentive professional and following market trends, recently I have been improving myself in Javascript and Typescript, more specifically on the React.js and Node.js stack.</p> <address><b>Get in touch</b><br /><a href='#'>vieweg@gmail.com</a><br>07447 485834 <small>(better by text message or whatsapp)</small></address><p><b>You can find some of my latest projects below</b></p>";

  const avatar = {
    url:
      "https://por-navegantes.s3.amazonaws.com/2304d6cbce25ed468d63-avatar.jpg",
    alt: "Rafael Vieweg - Software Developer",
    newStories: true,
    tag: "oi",
  };

  const links: LinksBlockProps = {
    direction: "row",
    cssClassTitle: "text-red-500 text-center text-xl font-bold",
    showTitles: false,
    links: [
      {
        title: "Google",
        url: "http://www.google.com.br",
        icon: RiAccountBoxFill,
        classCssLink: "text-black hover:text-red-700",
        classCssIcon: "text-blue-500 hover:text-red-700",
        size: 25,
        target: "_blank",
      },
      {
        title: "Facebook",
        url: "www.sss",
        icon: RiFacebookBoxFill,
        size: 25,
        classCssLink: "text-black hover:text-red-700",
        classCssIcon: "text-blue-400",
      },
      {
        title: "Facebook",
        size: 25,
        classCssLink: "text-black hover:text-red-700",
        url: "www.",
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Welcome!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header avatar={avatar} html={excerpt} excerpt={html} links={links} />
        <main>Conteudo</main>

        <footer>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Powered by Fixas
          </a>
        </footer>
      </div>
    </>
  );
}
