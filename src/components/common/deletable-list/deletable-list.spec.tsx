import { render } from '@testing-library/react';

import DeletableList from './deletable-list';

describe('DeletableList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DeletableList
        header={''}
        items={[]}
        showSearch={true}
        onDelete={function (): void {
          throw new Error('Function not implemented.');
        }}
        onClick={function (id: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
