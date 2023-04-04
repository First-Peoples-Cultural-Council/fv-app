import { DictionaryNavItem } from '@fv-app/common-components';
import { Link, matchRoutes } from 'react-router-dom';
import classNames from 'classnames';

/* eslint-disable-next-line */
export interface DictionaryNavMobileProps {
  navItems: DictionaryNavItem[];
}

export function DictionaryNavMobile({ navItems }: DictionaryNavMobileProps) {
  return (
    <div className="md:hidden flex justify-around bg-white border border-black border-solid">
      {navItems.map((item) => {
        return (
          <Link
            key={item.id}
            to={item.path}
            className={classNames(
              'py-4 flex flex-col justify-center items-center cursor-pointer hover:underline',
              {
                [`${item.colors.activeText} underline`]: matchRoutes(
                  [...(item?.activePathMatches || []), { path: item.path }],
                  location
                ),
              },
              item.colors.hoverText
            )}
          >
            <div className="uppercase text-xs">{item.title}</div>
          </Link>
        );
      })}
    </div>
  );
}

export default DictionaryNavMobile;
