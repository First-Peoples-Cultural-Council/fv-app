import classNames from 'classnames';
import { useState } from 'react';

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
}: Readonly<MultiSwitchProps>) {
  const [selected, setSelected] = useState<number>(initialSelected);

  return (
    <div className={'multi-switch p-2'}>
      <div className={'w-fit rounded-lg'}>
        {items.map((item, index) => {
          return (
            <button
              key={item.name}
              className={classNames(
                'py-2 px-3 border-solid border-gray-300 border shadow-lg text-center space-x-1',
                {
                  'bg-primary-500 text-white hover:bg-primary-400 border-primary':
                    selected === index,
                  'bg-white hover:bg-gray-100': selected !== index,
                  'rounded-l-lg': index === 0,
                  'rounded-r-lg': index === items.length - 1,
                }
              )}
              onClick={() => {
                setSelected(index);
                onToggle(index);
              }}
            >
              {item.icon && <i className={item.icon} />}
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MultiSwitch;
