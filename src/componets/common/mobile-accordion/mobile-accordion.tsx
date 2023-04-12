/* eslint-disable-next-line */
import classNames from 'classnames';
import { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { Dialect } from '../data';

export interface MobileAccordionProps {
  image?: string;
  label: string;
  dialects?: Dialect[];
}

export function MobileAccordion({
  image,
  label,
  dialects,
}: MobileAccordionProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  return (
    <ClickAwayListener onClickAway={() => setIsDrawerOpen(false)}>
      <div className="sm:hidden w-full">
        <div className="flex flex-col rounded shadow m-3 bg-white">
          <div className="flex" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            {image ? (
              <img src={image} alt={label} className="w-[100px] h-[100px]" />
            ) : (
              <div
                style={{
                  background:
                    'url(https://www.firstvoices.com/explore/FV/sections/assets/images/cover.png) no-repeat center center/cover',
                }}
                className="w-[100px] h-[100px]"
              />
            )}
            <div className="p-4 flex items-center">{label}</div>
          </div>
          <div
            className={classNames('transition transition-all overflow-hidden', {
              'h-0 p-0': !isDrawerOpen,
              'h-auto p-3': isDrawerOpen,
            })}
          >
            {dialects?.map((item) => {
              return (
                <div key={item.id} className="flex my-1">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-[100px] h-[100px]"
                    />
                  ) : (
                    <div
                      style={{
                        background:
                          'url(https://www.firstvoices.com/explore/FV/sections/assets/images/cover.png) no-repeat center center/cover',
                      }}
                      className="w-[100px] h-[100px]"
                    />
                  )}
                  <div className="p-4 flex items-center">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default MobileAccordion;
