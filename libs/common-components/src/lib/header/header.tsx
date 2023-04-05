import classNames from 'classnames';
import FVLogo from '../../../../shared-assets/images/FVlogo.svg';
import { NavigationItem } from '../data';
import { Link } from 'react-router-dom';

export interface HeaderProps {
  className?: string;
  navItems?: NavigationItem[];
  currentTab: string;
}

export function Header({ className, navItems, currentTab }: HeaderProps) {
  return (
    <header
      className={classNames(
        'w-full bg-color-main-header hidden p-4 justify-between items-center md:flex',
        className
      )}
    >
      <div>
        <img src={FVLogo} alt="First Voices Logo" />
      </div>
      <nav>
        <ul className="flex">
          {navItems?.map((item) => (
            <li key={item.id} className="mr-5">
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
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
