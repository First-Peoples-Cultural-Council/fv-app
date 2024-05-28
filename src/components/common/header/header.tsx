import React, { useState } from 'react';
import classNames from 'classnames';
import FVLogo from '../../../assets/images/FVlogo.svg';
import { NavigationItem } from '../data';
import { Link } from 'react-router-dom';

export interface HeaderProps {
  className?: string;
  navItems?: NavigationItem[];
  extraNavItems?: NavigationItem[];
}

export function Header({
  className,
  navItems,
  extraNavItems,
}: Readonly<HeaderProps>) {
  const [showExtraNav, setShowExtraNav] = useState(false);

  return (
    <header
      role="banner"
      className={classNames(
        'main-header',
        'w-full bg-color-main-header hidden p-4 justify-between items-center md:flex',
        className
      )}
    >
      <div>
        <Link to="/">
          <img src={FVLogo} alt="First Voices Logo" className="h-12" />
        </Link>
      </div>
      <nav>
        <ul className="flex">
          {navItems?.map((item) => (
            <li key={item.id} className="mr-5">
              <Link
                to={item.to}
                onClick={() => setShowExtraNav(false)}
                className={classNames(
                  'flex items-center text-white cursor-pointer',
                  { 'ml-2': !!item.icon }
                )}
              >
                <div className="mr-2">{item.icon}</div>
                {item.label}
              </Link>
            </li>
          ))}
          <li key="extra-nav" className="mr-5">
            <div className="relative mr-2">
              <button onClick={() => setShowExtraNav(!showExtraNav)}>
                <i className="fv-menu text-white cursor-pointer" />
              </button>
            </div>
            {showExtraNav && (
              <div className="absolute top-14 right-0 w-48 p-2 space-y-2 transform lg:-translate-x-0 bg-fv-charcoal  rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {extraNavItems?.map((item) => (
                  <button
                    key={`${item.id}`}
                    onClick={() => setShowExtraNav(false)}
                    className="block"
                  >
                    <Link
                      to={item.to}
                      className={classNames(
                        'flex items-center text-white cursor-pointer',
                        { 'ml-2': !!item.icon }
                      )}
                    >
                      <div className="mr-2">{item.icon}</div>
                      {item.label}
                    </Link>
                  </button>
                ))}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
