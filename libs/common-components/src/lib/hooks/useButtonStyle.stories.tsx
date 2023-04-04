import type { Meta, StoryObj } from '@storybook/react';
import { useButtonStyle } from './useButtonStyle';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  onClick: () => void;
}

const Buttons = ({ onClick }: Props) => {
  const defaultButton = useButtonStyle();
  const primaryButtonStyle = useButtonStyle('primary', 'button');
  const primaryLinkStyle = useButtonStyle('primary', 'link');
  const secondaryButtonStyle = useButtonStyle('secondary', 'button');
  const secondaryLinkStyle = useButtonStyle('secondary', 'link');
  const tertiaryButtonStyle = useButtonStyle('tertiary', 'button');
  const tertiaryLinkStyle = useButtonStyle('tertiary', 'link');
  return (
    <div className="flex flex-col">
      <button onClick={onClick} className={classNames(defaultButton)}>
        Default Style Button
      </button>
      <button onClick={onClick} className={primaryButtonStyle}>
        Primary Standard Button
      </button>
      <button onClick={onClick} className={primaryLinkStyle}>
        Primary Standard Link
      </button>
      <button onClick={onClick} className={secondaryButtonStyle}>
        Secondary Standard Button
      </button>
      <button onClick={onClick} className={secondaryLinkStyle}>
        Secondary Standard Link
      </button>
      <button onClick={onClick} className={tertiaryButtonStyle}>
        Tertiary Standard Button
      </button>
      <button onClick={onClick} className={tertiaryLinkStyle}>
        Tertiary Standard Link
      </button>
      <a href="/" className={primaryButtonStyle}>
        Primary Anchor Button
      </a>
      <a href="/" className={primaryLinkStyle}>
        Primary Anchor Link
      </a>
      <a href="/" className={secondaryButtonStyle}>
        Secondary Anchor Button
      </a>
      <a href="/" className={secondaryLinkStyle}>
        Secondary Anchor Link
      </a>
      <a href="/" className={tertiaryButtonStyle}>
        Tertiary Anchor Button
      </a>
      <a href="/" className={tertiaryLinkStyle}>
        Tertiary Anchor Link
      </a>
      <Link to="/" className={primaryButtonStyle}>
        Primary Link Button
      </Link>
      <Link to="/" className={primaryLinkStyle}>
        Primary Standard Link
      </Link>
      <Link to="/" className={secondaryButtonStyle}>
        Secondary Link Button
      </Link>
      <Link to="/" className={secondaryLinkStyle}>
        Secondary Standard Link
      </Link>
      <Link to="/" className={tertiaryButtonStyle}>
        Tertiary Link Button
      </Link>
      <Link to="/" className={tertiaryLinkStyle}>
        Tertiary Standard Link
      </Link>
    </div>
  );
};

const meta = {
  component: Buttons,
  tags: ['autodocs'],
  argTypes: { onClick: { action: 'clicked' } },
} satisfies Meta<typeof Buttons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => <Buttons {...args} />,
};
