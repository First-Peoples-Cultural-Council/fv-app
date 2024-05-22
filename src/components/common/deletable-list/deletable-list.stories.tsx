import type { Meta, StoryObj } from '@storybook/react';
import { DeletableList } from './deletable-list';

const meta: Meta<typeof DeletableList> = {
  component: DeletableList,
};

export default meta;
type Story = StoryObj<typeof DeletableList>;

export const Primary: Story = {
  render: () => (
    <DeletableList
      header="this is the header"
      items={[
        {
          id: '1',
          display: <div>1</div>,
        },
        {
          id: '2',
          display: <div>2</div>,
        },
      ]}
      confirmMessage="Are you sure you want to delete this?"
      removeButtonText="Remove"
      removeSelectedButtonText="Remove Selected"
      onDelete={(ids) => {
        console.info(ids);
      }}
      onClick={(id) => {
        console.info(id);
      }}
    />
  ),
};

// header: string;
// items: DeleteListType[];
// showSearch: boolean;
// confirmMessage: string;
// removeButtonText: string;
// removeSelectedButtonText: string;
// onDelete: (ids: string[]) => void;
// onClick: (id: string) => void;
