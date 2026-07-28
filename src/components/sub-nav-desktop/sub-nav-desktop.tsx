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
        const isCurrentRoute = matchRoutes([...(item?.activePathMatches ?? []), { path: item.path }], location)
        return (
          <Link
            key={item.id}
            to={item.path}
            className={classNames(
              'w-20 h-20 m-2 rounded-lg flex flex-col justify-center text-center items-center cursor-pointer text-gray-500',
              { [`border ${item.colors.border} ${item.colors.activeText}`]: isCurrentRoute }
            )}
          >
            <item.icon className={classNames(item.iconSize)} />
            <div className={classNames('uppercase text-xs')}>{item.title}</div>
          </Link>
        )
      })}
    </nav>
  )
}

export default SubNavDesktop
