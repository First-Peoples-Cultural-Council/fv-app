import { Meta, StoryObj } from '@storybook/react';
import SearchHeader from './search-header';

const meta = {
  component: SearchHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Search',
    backgroundColors: {
      to: 'to-color-words-light',
      from: 'from-color-words-dark',
    },
  },
  render: (args) => <SearchHeader {...args} />,
};
