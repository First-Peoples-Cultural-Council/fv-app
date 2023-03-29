import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { NavigationItem } from '../data';

export interface MobileNavProps {
  navItems?: NavigationItem[];
}

export function MobileNav({ navItems }: MobileNavProps) {
  return (
    <>
      {/* Mobile Nav Spacer */}
      <div className="w-full block sm:hidden h-[56px]"></div>
      <nav className="fixed bottom-0 left-0 w-full bg-color-main-header flex p-4 justify-between items-center sm:hidden">
        <ul className="flex justify-around w-full">
          {navItems?.map((item) => (
            <li key={item.id} className="ml-4">
              <Link
                to={item.to}
                className={classNames(
                  'flex items-center text-white cursor-pointer',
                  { 'ml-2': !!item.icon }
                )}
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
