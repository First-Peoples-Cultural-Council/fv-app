import type { Meta, StoryObj } from '@storybook/react';
import { useButtonStyle } from './useButtonStyle';

export interface ButtonProps {
  type: 'primary' | 'secondary' | 'tertiary';
  buttonStyle: 'button' | 'link';
}

const Button = ({ type, buttonStyle }: ButtonProps) => {
  const className = useButtonStyle(type, buttonStyle);
  return <button className={className}>Button</button>;
};

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => <Button type="primary" buttonStyle="button" />,
};

export const Secondary: Story = {
  render: () => <Button type="secondary" buttonStyle="button" />,
};

export const Tertiary: Story = {
  render: () => <Button type="tertiary" buttonStyle="button" />,
};
