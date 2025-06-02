import { Link, useLocation, matchRoutes } from 'react-router'
import classNames from 'classnames'

// FPCC
import { SubNavItem } from 'components/common/data'

export interface SubNavDesktopProps {
  navItems: SubNavItem[]
}

export function SubNavDesktop({ navItems }: Readonly<SubNavDesktopProps>) {
  const location = useLocation()

  return (
    <nav className="hidden md:flex flex-col h-screen sidebar text-charcoal-500 shadow-lg">
      {navItems.map((item) => {
        return (
          <Link
            key={item.id}
            to={item.path}
            className={classNames('w-24 h-24 flex flex-col justify-center text-center items-center cursor-pointer')}
          >
            <i
              className={classNames(
                item.icon,
                item.iconSize,
                {
                  [`${item.colors.activeText} ${item.colors.border}`]: matchRoutes(
                    [...(item?.activePathMatches ?? []), { path: item.path }],
                    location
                  ),
                },
                item.colors.hoverText
              )}
            />
            <div className="uppercase text-xs">{item.title}</div>
          </Link>
        )
      })}
    </nav>
  )
}

export default SubNavDesktop
