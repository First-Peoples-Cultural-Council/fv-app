import { MenuSection } from '../data'
import Menu from '../menu/menu'
import { ReactNode, useState } from 'react'

export interface IconMenuProps {
  className?: string
  menuData: MenuSection[]
  srOnlyLabel: string
  icon: ReactNode
}

export function IconMenu({ menuData, srOnlyLabel, icon, className }: IconMenuProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  return (
    <div className={className}>
      <div>
        <button
          ref={setReferenceElement}
          type="button"
          className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600"
          id="menu-0-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={() => setShowMenu(true)}
        >
          <span className="sr-only">{srOnlyLabel}</span>
          {icon}
        </button>
      </div>

      {/*// <!--*/}
      {/*//   Dropdown menu, show/hide based on menu state.*/}
      {/*//*/}
      {/*//   Entering: "transition ease-out duration-100"*/}
      {/*//     From: "transform opacity-0 scale-95"*/}
      {/*//     To: "transform opacity-100 scale-100"*/}
      {/*//   Leaving: "transition ease-in duration-75"*/}
      {/*//     From: "transform opacity-100 scale-100"*/}
      {/*//     To: "transform opacity-0 scale-95"*/}
      {/*// -->*/}
      {showMenu && (
        <Menu referenceElement={referenceElement} menuData={menuData} closeMenu={() => setShowMenu(false)} />
      )}
    </div>
  )
}

export default IconMenu
