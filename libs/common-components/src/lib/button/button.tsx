import { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import {
  ButtonTypeEnum,
  StandardButtonButtonTypeEnum,
} from '@fv-app/common-components';
import { Link } from 'react-router-dom';

export interface BaseButtonProps {
  children: ReactNode;
  secondary?: boolean;
  small?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  buttonStyle?: 'link' | 'button' | 'menuItem';
  isLoading?: boolean;
  loadingText?: string;
  role?: string;
  tabIndex?: number;
}

export interface StandardButtonProps extends BaseButtonProps {
  type: ButtonTypeEnum.button;
}

export interface StandardButtonButtonProps extends StandardButtonProps {
  buttonType: StandardButtonButtonTypeEnum.button;
  onClick: (e?: any) => void;
}

export interface StandardSubmitButtonProps extends StandardButtonProps {
  buttonType: StandardButtonButtonTypeEnum.submit;
}

export interface LinkProps extends BaseButtonProps {
  type: ButtonTypeEnum.Link;
  to: string;
  state?: { [key: string]: any };
}

export interface AProps extends BaseButtonProps {
  type: ButtonTypeEnum.a;
  href: string;
  target?: string;
}

export type ButtonProps =
  | StandardSubmitButtonProps
  | StandardButtonButtonProps
  | LinkProps
  | AProps;

export const Button = (props: ButtonProps) => {
  const isButton = (
    variableToCheck: unknown
  ): variableToCheck is StandardButtonProps =>
    (variableToCheck as StandardButtonProps).type === ButtonTypeEnum.button;
  const isSubmitButton = (
    variableToCheck: unknown
  ): variableToCheck is StandardSubmitButtonProps => {
    return (
      isButton(variableToCheck) &&
      (variableToCheck as StandardSubmitButtonProps).buttonType ===
        StandardButtonButtonTypeEnum.submit
    );
  };
  const isButtonButton = (
    variableToCheck: unknown
  ): variableToCheck is StandardButtonButtonProps => {
    return (
      isButton(variableToCheck) &&
      (variableToCheck as StandardButtonButtonProps).buttonType ===
        StandardButtonButtonTypeEnum.button
    );
  };
  const isLink = (variableToCheck: unknown): variableToCheck is LinkProps =>
    (variableToCheck as LinkProps).type === ButtonTypeEnum.Link;
  const isA = (variableToCheck: unknown): variableToCheck is AProps =>
    (variableToCheck as AProps).type === ButtonTypeEnum.a;

  const { children, className, secondary, buttonStyle, role, tabIndex } = props;

  let classes;
  if (buttonStyle === 'menuItem') {
    classes = classNames(
      'w-full text-left text-gray-700 active:bg-gray-100 hover:bg-gray-100 active:text-gray-900 hover:text-gray-900 block px-4 py-2 text-sm',
      { 'pointer-events-none': props.disabled || props.isLoading },
      className
    );
  } else if (buttonStyle === 'link') {
    classes = classNames(
      'font-medium',
      {
        'pointer-events-none text-gray-600': props.disabled || props.isLoading,
      },
      {
        'text-color-primary-0 hover:text-color-primary-2':
          !props.disabled && !props.isLoading,
      },
      className
    );
  } else {
    classes = classNames(
      'inline-block rounded-md border border-transparent py-2 px-4 text-base font-medium',
      {
        'bg-color-primary-0 text-white hover:bg-color-primary-3 border border-white':
          !secondary,
        'bg-white text-color-primary-0 hover:bg-color-primary-1 hover:text-white border border-white':
          secondary,
      },
      { 'pointer-events-none': props.disabled || props.isLoading },
      className
    );
  }

  const buttonContents = props.isLoading ? (
    <span>
      {props.loadingText}{' '}
      <i className="wte4d-plate-utensils-regular animate-spin" />
    </span>
  ) : (
    children
  );

  if (isButtonButton(props)) {
    const { onClick, buttonType } = props;
    return (
      <button
        onClick={onClick}
        type={buttonType}
        className={classes}
        role={role}
        tabIndex={tabIndex}
        disabled={props.disabled || props.isLoading}
      >
        {buttonContents}
      </button>
    );
  } else if (isSubmitButton(props)) {
    const { buttonType } = props;
    return (
      <button
        type={buttonType}
        className={classes}
        role={role}
        tabIndex={tabIndex}
        disabled={props.disabled || props.isLoading}
      >
        {buttonContents}
      </button>
    );
  } else if (isLink(props)) {
    const { to, state } = props;
    return (
      <Link
        to={to}
        className={classes}
        state={state}
        role={role}
        tabIndex={tabIndex}
      >
        {buttonContents}
      </Link>
    );
  } else if (isA(props)) {
    const { href, target } = props;
    return (
      <a
        href={href}
        className={classes}
        role={role}
        tabIndex={tabIndex}
        target={target}
      >
        {buttonContents}
      </a>
    );
  }
  return null;
};

export default Button;
