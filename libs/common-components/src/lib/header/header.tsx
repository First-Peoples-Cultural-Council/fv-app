import logo from '../../../../shared-assets/images/logo.png';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <header className="bg-color-primary-0 p-2 w-full">
      <img src={logo} alt="First Voices logo" /> hey there
    </header>
  );
}

export default Header;
