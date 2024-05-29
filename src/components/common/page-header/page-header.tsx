import { ReactNode } from 'react';

export interface PageHeaderProps {
  title: string;
  backgroundColors: { to: string; from: string };
  children?: ReactNode;
}

export function PageHeader({
  title,
  backgroundColors,
  children,
}: Readonly<PageHeaderProps>) {
  return (
    <header
      role="banner"
      className={`sub-header flex py-5 px-4 bg-gradient-to-t ${backgroundColors.from} ${backgroundColors.to} justify-between items-center`}
    >
      <div className="text-white uppercase mr-2">{title}</div>
      {children}
    </header>
  );
}

export default PageHeader;
