import React from 'react';
import classNames from 'classnames';
import FVLogo from '../../../assets/images/FVlogo.svg';
import { NavigationItem } from '../data';
import { Link } from 'react-router-dom';

export interface HeaderProps {
  className?: string;
  navItems?: NavigationItem[];
  extraNavItems?: NavigationItem[];
  currentTab: string;
}

export function Header({
  className,
  navItems,
  extraNavItems,
  currentTab,
}: Readonly<HeaderProps>) {
  const [showExtraNav, setShowExtraNav] = React.useState(false);

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
          <img src={FVLogo} alt="First Voices Logo" />
        </Link>
      </div>
      <nav>
        <ul className="flex">
          {navItems?.map((item) => (
            <li key={item.id} className="mr-5">
              <button onClick={() => setShowExtraNav(false)}>
                <Link
                  to={item.to}
                  className={classNames(
                    'flex items-center text-white cursor-pointer',
                    { 'ml-2': !!item.icon }
                  )}
                  style={{
                    textShadow:
                      item.id === currentTab ? '0 0 10px #9F6' : '0 0 0px #000',
                  }}
                >
                  <div className="mr-2">{item.icon}</div>
                  {item.label}
                </Link>
              </button>
            </li>
          ))}
          <li key="extra-nav" className="mr-5">
            <div className="mr-2">
              <button onClick={() => setShowExtraNav(!showExtraNav)}>
                <i className="fv-menu text-white cursor-pointer" />
              </button>
            </div>
            {showExtraNav && (
              <div className="absolute top-14 -translate-x-2/4 bg-color-main-header p-4 z-50">
                {extraNavItems?.map((item) => (
                  <button
                    key={`${item.id}`}
                    onClick={() => setShowExtraNav(false)}
                  >
                    <Link
                      to={item.to}
                      className={classNames(
                        'flex items-center text-white cursor-pointer',
                        { 'ml-2': !!item.icon }
                      )}
                      style={{
                        textShadow:
                          item.id === currentTab
                            ? '0 0 10px #9F6'
                            : '0 0 0px #000',
                      }}
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
