import type { Meta, StoryObj } from '@storybook/react';
import { useButtonStyle } from './useButtonStyle';

const Buttons = () => {
  const primaryButtonStyle = useButtonStyle('primary', 'button');
  const primaryLinkStyle = useButtonStyle('primary', 'link');
  const secondaryButtonStyle = useButtonStyle('secondary', 'button');
  const secondaryLinkStyle = useButtonStyle('secondary', 'link');
  return (
    <div className="flex flex-col">
      <button className={primaryButtonStyle}>Primary Button</button>
      <button className={primaryLinkStyle}>Primary Link</button>
      <button className={secondaryButtonStyle}>Secondary Button</button>
      <button className={secondaryLinkStyle}>Secondary Link</button>
    </div>
  );
};

const meta = {
  component: Buttons,
} satisfies Meta<typeof Buttons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <Buttons />,
};
