import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

interface DropdownProps<ObjectType> {
  id: string;
  svgIcon?: string;
  title: string;
  colors: {
    colorText: string;
    bgMenu: string;
  };
  renderItem: (child: ObjectType) => JSX.Element | null;
  items?: Array<ObjectType>;
}

const Dropdown = <ObjectType,>({
  renderItem,
  ...item
}: DropdownProps<ObjectType>): JSX.Element | null => {
  const expandedRef = useRef<HTMLLIElement>(null);
  const [open, setOpen] = useState(false);
  const [align, setAlign] = useState("");

  const handleClickOutside = useCallback((e: MouseEvent): void => {
    if (
      expandedRef.current &&
      e.target instanceof HTMLElement &&
      expandedRef.current.contains(e.target)
    ) {
      return;
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      // Verify position for best align on window
      const expandedElement = expandedRef.current?.lastElementChild;
      const callerElement = expandedRef.current;
      if (expandedElement && callerElement) {
        const { width } = expandedElement.getBoundingClientRect();
        const { x } = callerElement.getBoundingClientRect();
        setAlign(x + width >= window.innerWidth ? "right-0" : "");
      }
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, handleClickOutside]);

  if (!item.items || item.items.length <= 0) {
    return null;
  }

  return (
    <li
      ref={expandedRef}
      key={item.id}
      className={`text-base py-2 font-medium ${item.colors.colorText}`}
    >
      <button
        onClick={() => setOpen((s) => !s)}
        aria-label={item.title}
        className="focus:outline-none"
      >
        <div className="relative flex flex-row items-center group text-base font-medium ">
          {item.svgIcon && (
            <div className="w-6 h-6 mr-2 group-hover:opacity-80">
              <i dangerouslySetInnerHTML={{ __html: item.svgIcon }} />
            </div>
          )}
          <div className="group-hover:opacity-80">{item.title}</div>
          {open ? (
            <FaCaretUp
              className={`${item.colors.colorText} ml-1 h-4 w-4 group-hover:opacity-80`}
              aria-hidden="true"
            />
          ) : (
            <FaCaretDown
              className={`${item.colors.colorText} ml-1 h-4 w-4 group-hover:opacity-80`}
              aria-hidden="true"
            />
          )}
        </div>
      </button>
      {open && (
        <div
          id={item.id}
          key={item.id}
          className={`absolute ${align} mt-9 w-96 p-8 pt-2 ml-2 rounded-md shadow-sm z-10 ${item.colors.bgMenu}`}
        >
          <ul role="presentation" onClick={() => setOpen((s) => !s)}>
            {item.items.map((child: ObjectType) => renderItem(child))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default Dropdown;
