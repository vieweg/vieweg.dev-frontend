import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaBars, FaCaretDown, FaTimes } from "react-icons/fa";
import Link from "next/link";

import { isValidURL } from "../../utils";
import Dropdown from "./Dropdown";

export interface LinkProps {
  id: string;
  svgIcon?: string;
  href: string;
  title: string;
  description?: string;
  colorMode?: "dark" | "default";
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
  const [allItems, setAllItems] = useState<LinkProps[]>([]);

  useEffect(() => {
    const items: LinkProps[] = [];
    props.leftItems && items.push(...props.leftItems);
    props.centerItems && items.push(...props.centerItems);
    props.rightItems && items.push(...props.rightItems);
    // Join all items of left, center and right menus in state.
    setAllItems(items);
  }, [props.leftItems, props.centerItems, props.rightItems]);

  const colors = useMemo(() => {
    const colorMode = props.dark ? "dark" : "default";
    const defaltColors = {
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
    return defaltColors[colorMode];
  }, [props.dark]);

  const renderLink = useCallback(
    (item: LinkProps) => {
      if (typeof item.href === "string" && item.href !== "") {
        return (
          <li
            key={item.id}
            className={`text-base py-2 font-medium group ${colors.colorText}`}
          >
            {isValidURL(item.href) ? (
              <a
                href={item.href}
                title={item.title}
                target={item.target}
                className="block"
              >
                <div className="flex flex-row items-center group-hover:opacity-80">
                  {item.svgIcon && (
                    <div className="w-6 h-6 mr-2">
                      <i dangerouslySetInnerHTML={{ __html: item.svgIcon }} />
                    </div>
                  )}
                  {item.title}
                </div>
                <div className="ml-8 mt-1">
                  <small className="text-gray-200 group-hover:opacity-80">
                    {item.description}
                  </small>
                </div>
              </a>
            ) : (
              <Link href={item.href}>
                <a title={item.title} className="block">
                  <div className="flex flex-row items-center group-hover:opacity-80">
                    {item.svgIcon && (
                      <div className="w-6 h-6 mr-2">
                        <i dangerouslySetInnerHTML={{ __html: item.svgIcon }} />
                      </div>
                    )}
                    {item.title}
                  </div>
                  <div className="ml-8 mt-1">
                    <small className="text-gray-200 group-hover:opacity-80">
                      {item.description}
                    </small>
                  </div>
                </a>
              </Link>
            )}
          </li>
        );
      }
      return null;
    },
    [colors]
  );

  const renderItem = useCallback(
    (item: LinkProps) => {
      if (item.items && item.items.length > 0) {
        return (
          <Dropdown
            key={item.id}
            id={item.id}
            svgIcon={item.svgIcon}
            title={item.title}
            colors={colors}
            items={item.items}
            renderItem={renderLink}
          />
        );
      }
      return renderLink(item);
    },
    [renderLink, colors]
  );

  const renderItemMobile = useCallback(
    ({ ...item }: LinkProps) => {
      if (item.items && item.items.length > 0) {
        return (
          <li key={item.id} className="w-full py-4">
            <div
              className={`flex flex-row items-baseline group text-base font-medium ${colors.colorText} hover:${colors.colorTextHover}`}
            >
              {item.title}{" "}
              <FaCaretDown
                className={`${colors.colorText}  ml-1 h-4 w-4 group-hover:${colors.colorTextHover}`}
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
              className={`text-base py-1 font-medium ${colors.colorText} hover:${colors.colorTextHover}`}
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
            className={`text-base py-1 font-medium ${colors.colorText} hover:${colors.colorTextHover}`}
          >
            <Link href={item.href}>
              <a title={item.title}>{item.title}</a>
            </Link>
          </li>
        );
      }
      return null;
    },
    [colors]
  );

  return (
    <>
      <div
        className={`flex flex-row justify-between items-center flex-wrap px-8 py-5 border-b-2 ${colors.bgMenu} ${colors.borderColor} shadow-md z-10`}
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
              <ul className="flex flex-row space-x-6 justify-start focus:outline-none">
                {props.leftItems.map((leftItem) => renderItem(leftItem))}
              </ul>
            </div>
          )}
          {props.centerItems && props.centerItems.length > 0 && (
            <div className="flex-1">
              <ul className="flex flex-row space-x-6 justify-center focus:outline-none">
                {props.centerItems.map((centerItem) => renderItem(centerItem))}
              </ul>
            </div>
          )}
          {props.rightItems && props.rightItems.length > 0 && (
            <div className="flex-1">
              <ul className="flex flex-row space-x-6 justify-end focus:outline-none">
                {props.rightItems.map((rightItem) => renderItem(rightItem))}
              </ul>
            </div>
          )}
        </div>
        <div className="md:hidden">
          <button
            aria-label="Menu"
            onClick={() => setShowmobile((s) => !s)}
            className={`flex flex-row p-1 items-baseline group ${colors.colorText} hover:${colors.colorTextHover} focus:outline-none`}
          >
            {showMobile ? (
              <FaTimes
                className={`${colors.colorText} h-9 w-9 group-hover:${colors.colorTextHover}`}
                aria-hidden="true"
              />
            ) : (
              <FaBars
                className={`${colors.colorText} h-9 w-9 group-hover:${colors.colorTextHover}`}
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>
      {showMobile && (
        <nav
          className={`absolute ${colors.bgMenu} w-full p-8 pt-2 rounded-b-md shadow-sm z-10 md:hidden`}
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
