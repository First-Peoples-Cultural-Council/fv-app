import classNames from 'classnames';

export const useButtonStyle = (
  type: 'primary' | 'secondary' | 'tertiary' = 'primary',
  style: 'button' | 'link' = 'button'
) => {
  return classNames({
    'py-2 px-4 rounded shadow text-center': style === 'button',
    'text-center': style === 'link',
    'bg-color-primary-0 text-white hover:text-gray-400 hover:bg-color-primary-3':
      type === 'primary' && style === 'button',
    'text-color-primary-0 hover:text-color-primary-3':
      type === 'primary' && style === 'link',
    'bg-color-secondary-0 text-white hover:text-gray-400 hover:bg-color-secondary-3':
      type === 'secondary' && style === 'button',
    'text-color-secondary-0 hover:text-color-secondary-3':
      type === 'secondary' && style === 'link',
    'bg-color-tertiary-0 text-white hover:text-gray-400 hover:bg-color-tertiary-3':
      type === 'tertiary' && style === 'button',
    'text-color-tertiary-0 hover:text-color-tertiary-3':
      type === 'tertiary' && style === 'link',
  });
};
