import logo from '../../../../shared-assets/images/logo.png';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <header className="bg-color-primary-0 w-full flex justify-between shadow shadow">
      <div className="m-[15px]">
        <img src={logo} alt="First Voices logo h-[30px]" />
      </div>
    </header>
  );
}

export default Header;
