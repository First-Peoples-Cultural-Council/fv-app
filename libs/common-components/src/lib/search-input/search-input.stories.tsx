import { Meta, StoryObj } from '@storybook/react';
import SearchInput from './search-input';

const meta = {
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    clickSearch: { action: 'clicked' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: 'Search',
  },
};
