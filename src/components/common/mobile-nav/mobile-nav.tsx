import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { NavigationItem } from '../data';

export interface MobileNavProps {
  navItems?: NavigationItem[];
  currentTab: string;
}

export function MobileNav({ navItems, currentTab }: MobileNavProps) {
  return (
    <>
      {/* Mobile Nav Spacer */}
      <div className="w-full block md:hidden h-[56px]"></div>
      <nav className="fixed bottom-0 left-0 w-full bg-color-main-header flex p-4 justify-between items-center md:hidden">
        <ul className="flex justify-around w-full">
          {navItems?.map((item) => (
            <li key={item.id}>
              <Link
                to={item.to}
                className={classNames(
                  'flex items-center text-white cursor-pointer text-3xl',
                  { 'ml-2': !!item.icon }
                )}
                style={{
                  textShadow:
                    item.id === currentTab ? '0 0 10px #9F6' : '0 0 0px #000',
                }}
              >
                {item.icon}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default MobileNav;