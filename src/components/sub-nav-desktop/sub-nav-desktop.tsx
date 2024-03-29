import { Link, useLocation, matchRoutes } from 'react-router-dom';
import classNames from 'classnames';
import { SubNavItem } from '../common/data';

export interface SubNavDesktopProps {
  navItems: SubNavItem[];
}

export function SubNavDesktop({ navItems }: SubNavDesktopProps) {
  const location = useLocation();

  return (
    <nav className="sidebar w-[100px] flex flex-col hidden md:block mr-5" role="complementary">
      {navItems.map((item) => {
        return (
          <Link
            key={item.id}
            to={item.path}
            className={classNames(
              'w-[100px] h-[100px] flex flex-col justify-center text-center items-center cursor-pointer border-r-4 border-r-solid border-transparent',
              {
                [`${item.colors.activeText} ${item.colors.border}`]:
                  matchRoutes(
                    [...(item?.activePathMatches ?? []), { path: item.path }],
                    location
                  ),
              },
              item.colors.hoverText
            )}
          >
            <i className={classNames(item.icon, item.iconSize)} />
            <div className="uppercase text-xs">{item.title}</div>
          </Link>
        );
      })}
    </nav>
  );
}

export default SubNavDesktop;
