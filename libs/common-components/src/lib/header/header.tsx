import classNames from 'classnames';
import FVLogo from '../../../../shared-assets/images/FVlogo.svg';
import { NavigationItem } from '../data';
import { Link } from 'react-router-dom';

export interface HeaderProps {
  className?: string;
  navItems?: NavigationItem[];
}

export function Header({ className, navItems }: HeaderProps) {
  return (
    <header
      className={classNames(
        'w-full bg-color-main-header hidden p-4 justify-between items-center sm:flex',
        className
      )}
    >
      <div>
        <img src={FVLogo} alt="First Voices Logo" />
      </div>
      <nav>
        <ul className="flex">
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
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
