import React from "react";
import Image from "next/image";

export interface AvatarProps {
  url: string;
  alt: string;
  newStories?: boolean | undefined;
  tag?: string | undefined;
  onCLick?: () => void;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <div className="relative w-80 h-80 rounded-full overflow-hidden ">
      {props.newStories ? (
        <button onClick={props.onCLick}>
          <div
            className="absolute bg-gradient-to-tr from-pink-700  to-blue-500 animate-spinSlow"
            style={{ width: 320, height: 320 }}
          />
          <div
            className="absolute  rounded-full bg-white"
            style={{ width: 308, height: 308, left: 6, top: 6 }}
          />
          <div
            style={{
              width: 300,
              height: 300,
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            <Image
              className="rounded-full bg-gray-50"
              src={props.url}
              alt={props.alt}
              width="300"
              height="300"
            />
          </div>
        </button>
      ) : (
        <>
          <div
            className="absolute bg-gradient-to-tr from-gray-100  to-gray-300"
            style={{ width: 320, height: 320 }}
          />
          <div
            className="absolute  rounded-full bg-white"
            style={{ width: 308, height: 308, left: 6, top: 6 }}
          />
          <div
            style={{
              width: 300,
              height: 300,
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            <Image
              className="rounded-full bg-gray-50"
              src={props.url}
              alt={props.alt}
              width="300"
              height="300"
            />
          </div>
        </>
      )}

      {props.tag && (
        <div className="absolute bottom-0  bg-gradient-to-tl from-blue-300  to-blue-600 text-center text-white text-lg font-bold w-full p-3 transform -rotate-12 translate-x-6 -translate-y-6">
          <span>{props.tag}</span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
