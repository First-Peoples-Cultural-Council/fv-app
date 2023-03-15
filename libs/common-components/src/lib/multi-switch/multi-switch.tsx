import classNames from 'classnames';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface MultiSwitchProps {
  selected: number;
  items: {
    name: string;
    icon: string | null;
  }[];
  onToggle: (index: number) => void;
}

export function MultiSwitch({
  selected: initialSelected,
  items,
  onToggle,
}: MultiSwitchProps) {
  const [selected, setSelected] = useState<number>(initialSelected);

  return (
    <div className={'p-2'}>
      <div className={'w-fit rounded-lg'}>
        {items.map((item, index) => {
          return (
            <button
              key={index}
              className={classNames(
                'py-2 px-4 border-solid border-gray-300 border-2 shadow-md text-center',
                {
                  'bg-cyan-900 text-white': selected === index,
                  'bg-gray-200': selected !== index,
                  'rounded-l-lg': index === 0,
                  'rounded-r-lg': index === items.length - 1,
                }
              )}
              onClick={() => {
                setSelected(index);
                onToggle(index);
              }}
            >
              <i className={item.icon !== null ? item.icon : ''}>{item.name}</i>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MultiSwitch;
