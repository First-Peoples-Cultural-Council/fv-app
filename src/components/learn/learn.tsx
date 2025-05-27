import { useEffect, useState } from 'react'
import { matchRoutes, Outlet, useLocation } from 'react-router-dom'

// FPCC
import SubNavDesktop from 'components/sub-nav-desktop/sub-nav-desktop'
import SubNavMobile from 'components/sub-nav-mobile/sub-nav-mobile'
import PageHeader from 'components/common/page-header/page-header'
import { learnSubNavItems } from 'constants/navigation'
import { SubNavItem } from 'components/common/data'

export function LearnView() {
  const location = useLocation()
  const [currentNavItem, setCurrentNavItem] = useState<SubNavItem | null>(learnSubNavItems[0])

  useEffect(() => {
    const currentNavItem = learnSubNavItems.find((item) =>
      matchRoutes([{ path: item.path }, ...(item?.activePathMatches ?? [])], location)
    )
    if (currentNavItem) {
      setCurrentNavItem(currentNavItem)
    } else {
      setCurrentNavItem(null)
    }
  }, [location])

  return currentNavItem ? (
    <div>
      <SubNavMobile navItems={learnSubNavItems} />
      {currentNavItem && (
        <PageHeader
          title={currentNavItem.title}
          backgroundColors={{
            to: currentNavItem.colors.to,
            from: currentNavItem.colors.from,
          }}
        />
      )}
      <div className="flex w-full">
        <SubNavDesktop navItems={learnSubNavItems} />
        <Outlet />
      </div>
    </div>
  ) : (
    <Outlet />
  )
}

export default LearnView
