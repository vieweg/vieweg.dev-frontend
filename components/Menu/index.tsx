import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { isValidURL } from "../../utils";
import { FaBars, FaCaretDown, FaTimes } from "react-icons/fa";

interface LinkProps {
  id: string;
  svgIcon?: string;
  href: string;
  title: string;
  description?: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | string;
  nextLink?: boolean;
  element?: HTMLElement;
  items?: Array<LinkProps>;
}

export interface MenuProps {
  logo?: {
    url: string;
    alt?: string;
    title?: string;
    href?: string;
    width?: number;
    height?: number;
  };
  dark?: boolean;
  leftItems?: Array<LinkProps>;
  centerItems?: Array<LinkProps>;
  rightItems?: Array<LinkProps>;
}

const Menu: React.FC<MenuProps> = ({ ...props }) => {
  const [showMobile, setShowmobile] = useState(false);
  const [colorMode, setColorMode] = useState<"default" | "dark">(
    props.dark ? "dark" : "default"
  );

  useEffect(() => {
    setColorMode(props.dark ? "dark" : "default");
  }, [props.dark]);

  const colors = useMemo(() => {
    return {
      dark: {
        bgMenu: "bg-gray-800",
        borderColor: "border-gray-100",
        colorText: "text-gray-400",
        colorTextHover: "text-gray-500",
      },
      default: {
        bgMenu: "bg-white",
        borderColor: "border-gray-100",
        colorText: "text-gray-400",
        colorTextHover: "text-gray-600",
      },
    };
  }, []);

  const togleDropdown = useCallback((idElement) => {
    const element = document.getElementById(idElement);
    if (!element) return;

    if (!element.style.display || element.style.display == "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }, []);

  const renderItem = useCallback(
    ({ ...item }: LinkProps) => {
      if (item.items && item.items.length > 0) {
        return (
          <li key={item.id} className="relative py-2">
            <button
              name={item.title}
              onClick={() => togleDropdown(item.id)}
              onBlur={() => togleDropdown(item.id)}
              className={`flex flex-row items-baseline group text-base font-medium ${colors[colorMode].colorText} hover:${colors[colorMode].colorTextHover}`}
            >
              {item.title}{" "}
              <FaCaretDown
                className={`${colors[colorMode].colorText} ml-1 h-4 w-4 group-hover:${colors[colorMode].colorTextHover}`}
                aria-hidden="true"
              />
            </button>
            <div
              id={item.id}
              className={`absolute ${colors[colorMode].bgMenu} w-96 p-8 pt-2 ml-2 rounded-md shadow-sm hidden`}
            >
              <ul>{item.items.map((child) => renderItem({ ...child }))}</ul>
            </div>
          </li>
        );
      }

      if (typeof item.href === "string") {
        if (isValidURL(item.href)) {
          return (
            <li
              key={item.id}
              className={`text-base py-2 font-medium ${colors[colorMode].colorText} hover:${colors[colorMode].colorTextHover}`}
            >
              <a key={item.id} href={item.href} title={item.title}>
                {item.title}
              </a>
            </li>
          );
        }
        return (
          <li
            key={item.id}
            className={`text-base py-2 font-medium ${colors[colorMode].colorText} hover:${colors[colorMode].colorTextHover}`}
          >
            <Link href={item.href}>
              <a title={item.title}>{item.title}</a>
            </Link>
          </li>
        );
      }

      return null;
    },
    [togleDropdown, colorMode, colors]
  );

  const renderItemMobile = useCallback(
    ({ ...item }: LinkProps) => {
      if (item.items && item.items.length > 0) {
        return (
          <li key={item.id} className="w-full py-4">
            <div
              className={`flex flex-row items-baseline group text-base font-medium ${colors[colorMode].colorText} hover:${colors[colorMode].colorTextHover}`}
            >
              {item.title}{" "}
              <FaCaretDown
                className={`${colors[colorMode].colorText}  ml-1 h-4 w-4 group-hover:${colors[colorMode].colorTextHover}`}
                aria-hidden="true"
              />
            </div>
            <ul className="ml-4">
              {item.items.map((child) => renderItemMobile({ ...child }))}
            </ul>
          </li>
        );
      }

      if (typeof item.href === "string") {
        if (isValidURL(item.href)) {
          return (
            <li
              key={item.id}
              className={`text-base py-1 font-medium ${colors[colorMode].colorText} hover:${colors[colorMode].colorTextHover}`}
            >
              <a key={item.id} href={item.href} title={item.title}>
                {item.title}
              </a>
            </li>
          );
        }
        return (
          <li
            key={item.id}
            className={`text-base py-1 font-medium ${colors[colorMode].colorText} hover:${colors[colorMode].colorTextHover}`}
          >
            <Link href={item.href}>
              <a title={item.title}>{item.title}</a>
            </Link>
          </li>
        );
      }
      return null;
    },
    [colors, colorMode]
  );

  const allItems: LinkProps[] = [];
  props.leftItems && allItems.push(...props.leftItems);
  props.centerItems && allItems.push(...props.centerItems);
  props.rightItems && allItems.push(...props.rightItems);

  return (
    <>
      <div
        className={`flex flex-row justify-between items-center flex-wrap px-8 py-5 border-b-2 ${colors[colorMode].bgMenu} ${colors[colorMode].borderColor} shadow-md z-10`}
      >
        <div className="">
          {props.logo && (
            <Link href={props.logo?.href || "/"}>
              <a title={props.logo.title}>
                <img
                  src={props.logo?.url}
                  alt={props.logo?.alt}
                  title={props.logo?.alt}
                  width={props.logo?.width}
                  height={props.logo?.height}
                  className="mr-5"
                />
              </a>
            </Link>
          )}
        </div>
        <div className="hidden md:flex flex-grow flex-row">
          {props.leftItems && props.leftItems.length > 0 && (
            <div className="flex-1">
              <ul className="flex flex-row space-x-6 justify-start">
                {props.leftItems.map((leftItem) => renderItem(leftItem))}
              </ul>
            </div>
          )}
          {props.centerItems && props.centerItems.length > 0 && (
            <div className="flex-1">
              <ul className="flex flex-row space-x-6 justify-center">
                {props.centerItems.map((centerItem) => renderItem(centerItem))}
              </ul>
            </div>
          )}
          {props.rightItems && props.rightItems.length > 0 && (
            <div className="flex-1">
              <ul className="flex flex-row space-x-6 justify-end">
                {props.rightItems.map((rightItem) => renderItem(rightItem))}
              </ul>
            </div>
          )}
        </div>
        <div className="md:hidden">
          <button
            name="Open menu"
            onClick={() => setShowmobile((s) => !s)}
            className={`flex flex-row items-baseline group ${colors[colorMode].colorText} hover:${colors[colorMode].colorTextHover} focus:outline-none`}
          >
            {showMobile ? (
              <FaTimes
                className={`${colors[colorMode].colorText} ml-1 h-6 w-6 group-hover:${colors[colorMode].colorTextHover}`}
                aria-hidden="true"
              />
            ) : (
              <FaBars
                className={`${colors[colorMode].colorText} ml-1 h-6 w-6 group-hover:${colors[colorMode].colorTextHover}`}
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>
      {showMobile && (
        <nav
          className={`absolute ${colors[colorMode].bgMenu} w-full p-8 pt-2 rounded-b-md shadow-sm z-10 md:hidden`}
        >
          <ul>
            {allItems && allItems.map((item) => renderItemMobile({ ...item }))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Menu;
