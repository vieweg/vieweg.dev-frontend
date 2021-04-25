import React from "react";
import Image from "next/image";

export interface AvatarProps {
  url: string;
  alt: string;
  newStories?: boolean | undefined;
  tag?: string | undefined;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <div className="relative w-80 rounded-full overflow-hidden ">
      {props.newStories ? (
        <a href="#">
          <div className="flex w-80 h-80 p-1.5 bg-gradient-to-tr from-pink-700  to-blue-500">
            <div className="p-1 rounded-full bg-white">
              <Image
                className="rounded-full bg-gray-50"
                src={props.url}
                alt={props.alt}
                width="320"
                height="320"
              />
            </div>
          </div>
        </a>
      ) : (
        <div className="flex w-80 h-80 p-1.5 bg-gray-300">
          <div className="p-1 rounded-full bg-white">
            <Image
              className="rounded-full bg-gray-50"
              src={props.url}
              alt={props.alt}
              width="320"
              height="320"
            />
          </div>
        </div>
      )}

      {props.tag && (
        <div className="absolute bottom-0  bg-gradient-to-tl from-blue-800  to-blue-300 text-center text-white text-lg font-bold w-full p-3 transform -rotate-12 translate-x-6 -translate-y-6">
          <span>{props.tag}</span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
