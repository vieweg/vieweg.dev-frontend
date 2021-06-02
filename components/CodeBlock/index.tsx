import React, { useEffect } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";

import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import shell from "react-syntax-highlighter/dist/cjs/languages/prism/shell-session";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import md from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";

import {
  ReactBaseProps,
  ReactMarkdownProps,
} from "react-markdown/src/ast-to-react";

interface CodeBlockProps extends ReactBaseProps, ReactMarkdownProps {
  inline?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  inline = false,
  className,
  children,
  ...props
}) => {
  useEffect(() => {
    SyntaxHighlighter.registerLanguage("JSON", json);
    SyntaxHighlighter.registerLanguage("jsx", jsx);
    SyntaxHighlighter.registerLanguage("js", js);
    SyntaxHighlighter.registerLanguage("css", css);
    SyntaxHighlighter.registerLanguage("bash", bash);
    SyntaxHighlighter.registerLanguage("shell", shell);
    SyntaxHighlighter.registerLanguage("md", md);
  }, []);

  const match = /language-(\w+)/.exec(className || "");
  console.log("resultado: ", match);
  return !inline && match ? (
    <SyntaxHighlighter
      style={dracula}
      language={match[1]}
      PreTag="div"
      showLineNumbers
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {String(children).replace(/\n$/, "")}
    </code>
  );
};

export default CodeBlock;
