import type { Meta, StoryObj } from '@storybook/react';
import { IconLabelButton } from './icon-label-button';

const meta: Meta<typeof IconLabelButton> = {
  component: IconLabelButton,
};

export default meta;
type Story = StoryObj<typeof IconLabelButton>;

export const Primary: Story = {
  render: () => (
    <IconLabelButton />
  ),
};
