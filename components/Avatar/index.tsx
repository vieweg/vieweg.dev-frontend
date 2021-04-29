import React from "react";
import Image from "next/image";

export interface AvatarProps {
  url: string;
  alt: string;
  size?: number;
  newStories?: boolean | undefined;
  tag?: string | undefined;
  onCLick?: () => void;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const size = props.size ? props.size : 320;

  return (
    <div
      className="relative rounded-full overflow-hidden"
      style={{ width: size, height: size }}
    >
      {props.newStories ? (
        <button onClick={props.onCLick}>
          <div
            className="absolute bg-gradient-to-tr from-pink-700  to-blue-500 animate-spinSlow"
            style={{ width: size, height: size }}
          />
          <div
            className="absolute  rounded-full bg-white"
            style={{
              width: size - size * 0.036,
              height: size - size * 0.036,
              left: size * 0.02,
              top: size * 0.02,
            }}
          />
          <div
            style={{
              width: size - size * 0.065,
              height: size - size * 0.065,
              marginLeft: size * 0.034,
              marginTop: size * 0.034,
            }}
          >
            <Image
              className="rounded-full bg-gray-50"
              src={props.url}
              alt={props.alt}
              width={size - size * 0.065}
              height={size - size * 0.065}
            />
          </div>
        </button>
      ) : (
        <>
          <div
            className="absolute bg-gradient-to-tr from-gray-100  to-gray-300"
            style={{ width: size, height: size }}
          />
          <div
            className="absolute  rounded-full bg-white"
            style={{
              width: size - size * 0.036,
              height: size - size * 0.036,
              left: size * 0.02,
              top: size * 0.02,
            }}
          />
          <div
            style={{
              width: size - size * 0.065,
              height: size - size * 0.065,
              marginLeft: size * 0.034,
              marginTop: size * 0.034,
            }}
          >
            <Image
              className="rounded-full bg-gray-50"
              src={props.url}
              alt={props.alt}
              width={size - size * 0.065}
              height={size - size * 0.065}
            />
          </div>
        </>
      )}

      {props.tag && size > 200 && (
        <div className="absolute w-full h-1/4 -bottom-1 transform -rotate-6 bg-gradient-to-tl from-blue-300  to-indigo-600">
          <div className="m-auto w-3/6 text-center text-white p-2 text-lg font-bold">
            <span>{props.tag}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
