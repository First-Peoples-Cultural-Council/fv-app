import { useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import ClickAwayListener from 'react-click-away-listener';
import styles from './select.module.css';
import { usePopper } from 'react-popper';
import { SelectOption } from '../data';

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  className?: string;
  onChange: (value: {
    target: { type: string; name: string; id: string; value: string };
  }) => void;
  selected: string;
  name: string;
  menuClassName?: string;
}

export function Select({
  label,
  options,
  className,
  menuClassName,
  onChange,
  selected,
  name,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [{ name: 'arrow' }],
    }
  );

  const selectedOption = options.find((option) => option.id === selected);

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div className={className}>
        {!!label && (
          <label
            id="listbox-label"
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <button
            ref={setReferenceElement}
            type="button"
            className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="block truncate">{selectedOption?.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </span>
          </button>
          {/*//   Entering: ""*/}
          {/*//     From: ""*/}
          {/*//     To: ""*/}
          {/*//   Leaving: "transition ease-in duration-100"*/}
          {/*//     From: "opacity-100"*/}
          {/*//     To: "opacity-0"*/}
          {/*// -->*/}
          {isOpen && (
            <ul
              ref={setPopperElement}
              style={popperStyles['popper']}
              className={classNames(
                'absolute z-10 mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                menuClassName
              )}
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
              {...attributes['popper']}
            >
              {options.map((option) => (
                <li
                  key={option.id}
                  className={classNames(
                    'cursor-pointer text-gray-900 hover:text-white bg-white hover:bg-indigo-600 relative cursor-default select-none py-2 pl-3 pr-9',
                    styles['optionItem']
                  )}
                  id={option.id}
                  role="option"
                  onClick={() => {
                    onChange({
                      target: {
                        type: 'select',
                        name,
                        id: name,
                        value: option.id,
                      },
                    });
                    setIsOpen(false);
                  }}
                >
                  <span
                    className={classNames('block truncate', {
                      'font-semibold': selected === option.id,
                      'font-normal': selected !== option.id,
                    })}
                  >
                    {option.label}
                  </span>

                  {selected === option.id && (
                    <span
                      className={classNames(
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                        styles['checkmark']
                      )}
                    >
                      <CheckIcon className="h-5 w-5" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default Select;
