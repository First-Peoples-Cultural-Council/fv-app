import classNames from 'classnames';
import FVLogo from '../../../../shared-assets/images/FVlogo.svg';
import IconMenu from '../icon-menu/icon-menu';
import { ButtonTypeEnum } from '../data';

export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={classNames(
        'w-full bg-color-main-header flex p-4 justify-between items-center',
        className
      )}
    >
      <div>
        <img src={FVLogo} alt="First Voices Logo" />
      </div>
      <IconMenu
        icon={<i className="fv-menu w-[24px] h-[24px] text-white relative" />}
        menuData={[
          {
            id: 'settings',
            menuItems: [
              {
                id: 'settings',
                type: ButtonTypeEnum.Link,
                label: 'Settings',
                to: '/settings',
              },
            ],
          },
        ]}
        srOnlyLabel="Menu"
      />
    </header>
  );
}

export default Header;
