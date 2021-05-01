import React, { Fragment, useCallback } from "react";
import NextLink from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { isValidURL } from "../../utils";
import { FaBars, FaCaretDown, FaTimes } from "react-icons/fa";

interface LinkProps {
  id: string;
  title: string;
  href: string;
  description?: string;
  svgIcon?: string;
  items?: Array<LinkProps>;
}

export interface MenuProps {
  title: string;
  urlLogo: string;
  widthLogo?: number;
  heightLogo?: number;
  mainItems?: Array<LinkProps>;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const Menu: React.FC<MenuProps> = ({ ...props }) => {
  const ItemMenu = useCallback(({ title, href, svgIcon, items }: LinkProps) => {
    if (Array.isArray(items) && items.length > 0) {
      return (
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open ? "text-gray-400" : "text-white",
                  "group rounded-md inline-flex items-center text-base font-medium hover:text-gray-600 focus:outline-none"
                )}
              >
                {svgIcon && (
                  <img
                    src={`data:image/svg+xml;utf8,${svgIcon}`}
                    width={25}
                    height={25}
                    alt={title}
                  />
                )}
                <span>{title}</span>
                <FaCaretDown
                  className={classNames(
                    open ? "text-gray-400 transform rotate-180" : "text-white",
                    "ml-1 h-4 w-4 group-hover:text-gray-400"
                  )}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel
                  static
                  className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      {items &&
                        items.map((item) => (
                          <a
                            key={item.id}
                            href={item.href}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {item.svgIcon && (
                              <img
                                src={`data:image/svg+xml;utf8,${item.svgIcon}`}
                                width={25}
                                height={25}
                                alt={item.title}
                              />
                            )}
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">
                                {item.title}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.description}
                              </p>
                            </div>
                          </a>
                        ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      );
    }

    if (typeof href === "string") {
      if (isValidURL(href)) {
        return (
          <a
            href={href}
            className="text-base font-medium text-white hover:text-gray-500"
          >
            {svgIcon && (
              <img
                src={`data:image/svg+xml;utf8,${svgIcon}`}
                width={25}
                height={25}
                alt={title}
              />
            )}
            {title}
          </a>
        );
      } else {
        return (
          <NextLink href={href}>
            <a className="text-base font-medium text-white hover:text-gray-500">
              {svgIcon && (
                <img
                  src={`data:image/svg+xml;utf8,${svgIcon}`}
                  width={25}
                  height={25}
                  alt={title}
                />
              )}
              {title}
            </a>
          </NextLink>
        );
      }
    }
    return null;
  }, []);

  return (
    <Popover className="relative bg-gray-800 border-b-2 border-gray-100 ">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center py-2 md:justify-start md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <a href="/">
                  <span className="sr-only">{props.title}</span>
                  <img
                    className="h-8 w-auto"
                    src={props.urlLogo}
                    alt={props.title}
                    width={props.widthLogo}
                    height={props.heightLogo}
                  />
                </a>
              </div>
              <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 ">
                  <span className="sr-only">Open menu</span>
                  <FaBars className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <Popover.Group as="nav" className="hidden md:flex space-x-10">
                {props.mainItems &&
                  props.mainItems.map((itemMenu) => {
                    return <ItemMenu key={itemMenu.id} {...itemMenu} />;
                  })}
              </Popover.Group>
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <a
                  href="#"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign in
                </a>
                <a
                  href="#"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute top-0 inset-x-0 p-2 z-10 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src={props.urlLogo}
                        alt={props.title}
                        width={props.widthLogo}
                        height={props.heightLogo}
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <FaTimes className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      {props.mainItems &&
                        props.mainItems.map((itemMenu) => {
                          if (Array.isArray(itemMenu.items)) {
                            return (
                              <ItemMenu
                                key={`mob-${itemMenu.id}`}
                                {...itemMenu}
                              />
                            );
                          }
                        })}
                    </nav>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Menu;
