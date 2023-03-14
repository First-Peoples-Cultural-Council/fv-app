import { Meta, StoryObj } from '@storybook/react';
import SearchHeader from './search-header';

const meta = {
  component: SearchHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Words: Story = {
  args: {
    title: 'Search',
    backgroundColors: {
      to: 'to-color-words-light',
      from: 'from-color-words-dark',
    },
  },
};

export const Phrases: Story = {
  args: {
    title: 'Search',
    backgroundColors: {
      to: 'to-color-phrases-light',
      from: 'from-color-phrases-dark',
    },
  },
};

export const Songs: Story = {
  args: {
    title: 'Search',
    backgroundColors: {
      to: 'to-color-songs-light',
      from: 'from-color-songs-dark',
    },
  },
};

export const Stories: Story = {
  args: {
    title: 'Search',
    backgroundColors: {
      to: 'to-color-stories-light',
      from: 'from-color-stories-dark',
    },
  },
};
