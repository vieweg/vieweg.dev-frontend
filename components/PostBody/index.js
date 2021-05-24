import {useEffect} from 'react';
import Markdown from "markdown-to-jsx";
import "highlight.js/styles/dracula.css";

import hljs from "highlight.js/lib/core";
import language from "highlight.js/lib/languages/typescript";

hljs.registerLanguage("typescript", language);

const PostBody = ({child}) => {

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (<Markdown>{child}</Markdown>);
}

export default PostBody;
