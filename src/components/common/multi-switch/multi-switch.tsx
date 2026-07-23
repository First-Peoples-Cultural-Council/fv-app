import { useState } from 'react'
import classNames from 'classnames'
import { IconType } from 'react-icons'

export interface MultiSwitchProps {
  selected: number
  items: {
    name: string
    icon: IconType | null
  }[]
  onToggle: (index: number) => void
}

export function MultiSwitch({ selected: initialSelected, items, onToggle }: Readonly<MultiSwitchProps>) {
  const [selected, setSelected] = useState<number>(initialSelected)

  return (
    <div className={'multi-switch p-2'}>
      <div className={'w-fit rounded-lg'}>
        {items.map((item, index) => {
          const ItemIcon = item?.icon
          return (
            <button
              key={item.name}
              className={classNames('py-2 px-3 border-solid border-gray-300 border shadow-lg text-center space-x-1', {
                'bg-primary-500 text-white hover:bg-primary-400 border-primary': selected === index,
                'bg-white text-primary-500 hover:bg-gray-100': selected !== index,
                'rounded-l-lg': index === 0,
                'rounded-r-lg': index === items.length - 1,
              })}
              onClick={() => {
                setSelected(index)
                onToggle(index)
              }}
            >
              {ItemIcon && (
                <ItemIcon
                  className={classNames({
                    'text-primary-500': selected !== index,
                    'text-white': selected === index,
                  })}
                />
              )}
              <span>{item.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MultiSwitch
