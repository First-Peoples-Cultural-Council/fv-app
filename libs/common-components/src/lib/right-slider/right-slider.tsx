import classNames from 'classnames';
import { useState } from 'react';
import { Dialect } from '../data';

/* eslint-disable-next-line */
export interface RightSliderProps {
  isSliderOpen: boolean;
  onCloseSlider: () => void;
  dialects?: Dialect[];
}

export function RightSlider({
  isSliderOpen,
  onCloseSlider,
  dialects,
}: RightSliderProps) {
  return (
    <div
      className={classNames(
        'fixed sm:block hidden h-full w-[400px] top-0 bg-gray-100 shadow transition-all p-4',
        {
          'right-0': isSliderOpen,
          'right-[-400px]': !isSliderOpen,
        }
      )}
    >
      <i
        className="fv-cancel absolute top-2 right-2 cursor-pointer"
        onClick={onCloseSlider}
      />
      <h1 className="font-bold text-2xl">Dialects</h1>
      {dialects?.map((item) => {
        return (
          <div key={item.id} className="flex my-4 rounded shadow bg-white">
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
  );
}

export default RightSlider;
