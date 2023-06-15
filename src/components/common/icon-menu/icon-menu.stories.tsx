import type { Meta, StoryObj } from '@storybook/react';
import { IconMenu } from './icon-menu';

const meta: Meta<typeof IconMenu> = {
  component: IconMenu,
};

export default meta;
type Story = StoryObj<typeof IconMenu>;

export const Primary: Story = {
  render: () => (
    <IconMenu
      className="ml-3 relative"
      icon={<i className="fv-menu" />}
      menuData={[]}
      srOnlyLabel="Demo Menu"
    />
  ),
};
