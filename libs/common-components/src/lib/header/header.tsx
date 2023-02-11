import logo from '../../../../shared-assets/images/logo.png';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <header className=" p-2 w-full">
      <img src={logo} alt="" /> hey there
    </header>
  );
}

export default Header;
