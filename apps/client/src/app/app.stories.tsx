import type { Meta, StoryObj } from '@storybook/react';
import { App } from './app';

const meta = {
  component: App,
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <App />,
};
