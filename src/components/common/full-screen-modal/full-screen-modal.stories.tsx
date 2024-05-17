import type { Meta, StoryObj } from '@storybook/react';
import { FullScreenModal } from './full-screen-modal';

const meta: Meta<typeof FullScreenModal> = {
  component: FullScreenModal,
};

export default meta;
type Story = StoryObj<typeof FullScreenModal>;

export const Primary: Story = {
  render: () => (
    <FullScreenModal onClose={() => alert('close')}>
      <div>Content</div>
    </FullScreenModal>
  ),
};
