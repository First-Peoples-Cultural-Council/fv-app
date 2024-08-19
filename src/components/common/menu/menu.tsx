import ClickAwayListener from 'react-click-away-listener';
import classNames from 'classnames';
import { usePopper } from 'react-popper';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AnchorMenuItem,
  ButtonButtonMenuItem,
  ButtonMenuItem,
  ButtonTypeEnum,
  LinkMenuItem,
  MenuSection,
  StandardButtonButtonTypeEnum,
  SubmitButtonMenuItem,
} from '../data';

export interface MenuProps {
  className?: string;
  menuData: MenuSection[];
  closeMenu: () => void;
  referenceElement: HTMLElement | null;
}

export function Menu({
  menuData,
  closeMenu,
  className,
  referenceElement,
}: Readonly<MenuProps>) {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [{ name: 'arrow' }],
    }
  );
  const isButtonMenu = (
    variableToCheck: unknown
  ): variableToCheck is ButtonMenuItem =>
    (variableToCheck as ButtonMenuItem).type === ButtonTypeEnum.button;

  const isSubmitButtonMenu = (
    variableToCheck: unknown
  ): variableToCheck is SubmitButtonMenuItem => {
    return (
      isButtonMenu(variableToCheck) &&
      (variableToCheck as SubmitButtonMenuItem).buttonType ===
        StandardButtonButtonTypeEnum.submit
    );
  };

  const isButtonButtonMenu = (
    variableToCheck: unknown
  ): variableToCheck is ButtonButtonMenuItem => {
    return (
      isButtonMenu(variableToCheck) &&
      (variableToCheck as ButtonButtonMenuItem).buttonType ===
        StandardButtonButtonTypeEnum.button
    );
  };

  const isLinkMenu = (
    variableToCheck: unknown
  ): variableToCheck is LinkMenuItem =>
    (variableToCheck as LinkMenuItem).type === ButtonTypeEnum.Link;

  const isAnchorMenu = (
    variableToCheck: unknown
  ): variableToCheck is AnchorMenuItem =>
    (variableToCheck as AnchorMenuItem).type === ButtonTypeEnum.a;

  return (
    <ClickAwayListener onClickAway={closeMenu}>
      <div
        ref={setPopperElement}
        style={popperStyles['popper']}
        {...attributes['popper']}
        className={classNames(
          'z-10 mt-2 w-56 divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
          className
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        {menuData.map((section) => (
          <div
            key={section.id}
            className="py-1"
            role="none"
            onClick={closeMenu}
          >
            {section.menuItems.map((menuItem) => {
              if (isLinkMenu(menuItem)) {
                return (
                  <Link
                    key={menuItem.id}
                    to={menuItem.to}
                    className="z-10 text-gray-700 active:bg-gray-100 active:text-gray-900 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    {menuItem.label}
                  </Link>
                );
              } else if (isButtonMenu(menuItem)) {
                if (isSubmitButtonMenu(menuItem)) {
                  return (
                    <button
                      key={menuItem.id}
                      role="menuitem"
                      type="submit"
                      tabIndex={-1}
                      className="text-gray-700 active:bg-gray-100 active:text-gray-900 block px-4 py-2 text-sm"
                    >
                      {menuItem.label}
                    </button>
                  );
                } else if (isButtonButtonMenu(menuItem)) {
                  return (
                    <button
                      key={menuItem.id}
                      role="menuitem"
                      tabIndex={-1}
                      type="button"
                      onClick={menuItem.onClick}
                      className="text-gray-700 active:bg-gray-100 active:text-gray-900 block px-4 py-2 text-sm"
                    >
                      {menuItem.label}
                    </button>
                  );
                }
                return null;
              } else if (isAnchorMenu(menuItem)) {
                return (
                  <a
                    key={menuItem.id}
                    role="menuitem"
                    tabIndex={-1}
                    href={menuItem.href}
                    className="text-gray-700 active:bg-gray-100 active:text-gray-900 block px-4 py-2 text-sm"
                  >
                    {menuItem.label}
                  </a>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </ClickAwayListener>
  );
}

export default Menu;
