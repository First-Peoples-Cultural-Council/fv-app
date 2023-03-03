import classNames from 'classnames';

export const useButtonStyle = (
  type: 'primary' | 'secondary' | 'tertiary' = 'primary',
  style: 'button' | 'link' = 'button'
) => {
  if (type === 'primary') {
    return classNames();
  } else if (type === 'secondary') {
    return classNames();
  } else if (type === 'tertiary') {
    return classNames();
  }
  return '';
};
