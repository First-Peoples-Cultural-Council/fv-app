import { ChangeEventHandler, FocusEvent } from 'react';
import classNames from 'classnames';
import ErrorMessage from '../error-message/error-message';

/* eslint-disable-next-line */
export interface TextInputProps {
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  className?: string;
  error?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: any) => void;
  type?:
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'image'
    | 'month'
    | 'password'
    | 'range'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
}

export function TextInput({
  id,
  value,
  label,
  onChange,
  className,
  error,
  onBlur,
  onFocus,
  type = 'text',
}: TextInputProps) {
  return (
    <div className={classNames('col-span-6 sm:col-span-3 mb-2', className)}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        name={id}
        id={id}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <ErrorMessage message={error} test={!!error} />
    </div>
  );
}

export default TextInput;
