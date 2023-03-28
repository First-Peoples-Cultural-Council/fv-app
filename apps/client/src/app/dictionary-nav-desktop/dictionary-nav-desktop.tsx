import { Link, matchRoutes } from 'react-router-dom';
import classNames from 'classnames';
import { DictionaryNavItem } from '@fv-app/common-components';

export interface DictionaryNavDesktopProps {
  navItems: DictionaryNavItem[];
}

export function DictionaryNavDesktop({ navItems }: DictionaryNavDesktopProps) {
  return (
    <nav className="w-[100px] flex flex-col hidden md:block mr-5">
      {navItems.map((item) => {
        return (
          <Link
            key={item.id}
            to={item.path}
            className={classNames(
              'w-[100px] h-[100px] flex flex-col justify-center items-center cursor-pointer border-r-4 border-r-solid border-transparent',
              {
                [`${item.colors.activeText} ${item.colors.border}`]:
                  matchRoutes(
                    [...(item?.activePathMatches || []), { path: item.path }],
                    location
                  ),
              },
              item.colors.hoverText
            )}
          >
            <i className={classNames(item.icon, 'text-2xl')} />
            <div className="uppercase text-xs">{item.title}</div>
          </Link>
        );
      })}
    </nav>
  );
}

export default DictionaryNavDesktop;
