import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header';

const meta: Meta<typeof Header> = {
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  render: () => (
    <Header
      navItems={[
        {
          id: 'dictionary',
          label: 'Dictionary',
          to: '/dictionary',
          icon: <i className="fv-book" />,
        },
      ]}
    />
  ),
};
