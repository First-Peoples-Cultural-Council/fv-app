import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from './error-message';

const meta: Meta<typeof ErrorMessage> = {
  component: ErrorMessage,
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Primary: Story = {
  render: () => (
    <ErrorMessage message="This is the error message" test={true} />
  ),
};
