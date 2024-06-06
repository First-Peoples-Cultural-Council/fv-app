import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { NavigationItem } from '../data';

export interface MobileNavProps {
  navItems?: NavigationItem[];
  extraNavItems?: NavigationItem[];
}

export function MobileNav({
  navItems,
  extraNavItems,
}: Readonly<MobileNavProps>) {
  const [showExtraNav, setShowExtraNav] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Nav Spacer */}
      <div className="w-full block md:hidden h-[56px]"></div>
      <nav className="fixed bottom-0 left-0 w-full bg-charcoal-500 flex-auto p-4 justify-between items-center md:hidden">
        <ul className="flex justify-around w-full">
          {navItems?.map((item) => (
            <li key={item.id}>
              <Link
                to={item.to}
                className={classNames(
                  'flex items-center text-white cursor-pointer text-3xl',
                  {
                    'ml-2': !!item.icon,
                    'text-word-500': location.pathname.includes(item.id),
                  }
                )}
              >
                {item.icon}
              </Link>
            </li>
          ))}
          {!showExtraNav && (
            <li key="extra-nav">
              <button onClick={() => setShowExtraNav(true)}>
                <i className="fv-menu text-white cursor-pointer text-3xl" />
              </button>
            </li>
          )}
        </ul>
        {showExtraNav && (
          <ul className="flex justify-around w-full pt-3">
            {extraNavItems?.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  className={classNames(
                    'flex items-center text-white cursor-pointer text-3xl',
                    {
                      'ml-2': !!item.icon,
                      'text-word-500': location.pathname.includes(item.id),
                    }
                  )}
                >
                  {item.icon}
                </Link>
              </li>
            ))}
            {showExtraNav && (
              <li key="extra-nav">
                <button onClick={() => setShowExtraNav(false)}>
                  <i className="fv-menu text-white cursor-pointer text-3xl" />
                </button>
              </li>
            )}
          </ul>
        )}
      </nav>
    </>
  );
}

export default MobileNav;
