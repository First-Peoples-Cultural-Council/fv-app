import { Link, useLocation, matchRoutes } from 'react-router-dom'
import classNames from 'classnames'

// FPCC
import { SubNavItem } from 'components/common/data'

export interface SubNavMobileProps {
  navItems: SubNavItem[]
}

export function SubNavMobile({ navItems }: Readonly<SubNavMobileProps>) {
  const location = useLocation()

  return (
    <div className="md:hidden flex justify-around bg-white font-bold">
      {navItems.map((item) => {
        return (
          <Link
            key={item.id}
            to={item.path}
            className={classNames(
              'py-4 flex flex-col justify-center items-center cursor-pointer hover:underline',
              {
                [`${item.colors.activeText} underline`]: matchRoutes(
                  [...(item?.activePathMatches ?? []), { path: item.path }],
                  location
                ),
              },
              item.colors.hoverText
            )}
          >
            <div className="uppercase text-xs">{item.title}</div>
          </Link>
        )
      })}
    </div>
  )
}

export default SubNavMobile
