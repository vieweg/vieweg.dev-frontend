import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="w-full">
      <div className="text-center">
        <div className="flex flex-row w-auto m-auto justify-center items-center whitespace-pre-wrap">
          Get this code on{" "}
          <a
            href="https://github.com/vieweg/vieweg.dev"
            target="_blank"
            rel="noreferrer noopener"
            title="Github code repo"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
