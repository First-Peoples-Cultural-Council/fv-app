import { Meta, StoryObj } from '@storybook/react';
import Header from './header';

const meta = {
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <Header />,
};
