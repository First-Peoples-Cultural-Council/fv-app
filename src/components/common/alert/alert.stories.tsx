import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './alert';
import { ReactNode } from 'react';

const meta: Meta<typeof Alert> = {
  component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  render: () => (
    <Alert
      type="success"
      showAlert
      title="This is an Alert"
      message={<div>A React node can be used as the message.</div>}
      showDismissButton
      dismissAlert={() => {
        console.info('Dismissed');
      }}
      makeBlocking={false}
    />
  ),
};

export const Error: Story = {
  render: () => (
    <Alert
      type="error"
      showAlert
      title="This is an Alert"
      message="This is the message."
      showDismissButton
      dismissAlert={() => {
        console.info('Dismissed');
      }}
      makeBlocking={false}
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert
      type="warning"
      showAlert
      title="This is an Alert"
      message="This is the message."
      showDismissButton
      dismissAlert={() => {
        console.info('Dismissed');
      }}
      makeBlocking={false}
    />
  ),
};

export const Info: Story = {
  render: () => (
    <Alert
      type="info"
      showAlert
      title="This is an Alert"
      message="This is the message."
      showDismissButton
      dismissAlert={() => {
        console.info('Dismissed');
      }}
      makeBlocking={false}
    />
  ),
};
