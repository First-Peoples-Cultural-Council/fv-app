import { render } from '@testing-library/react';

import MultiSwitch from './multi-switch';

describe('MultiSwitch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MultiSwitch
        items={[]}
        onToggle={function (index: number): void {
          throw new Error('Function not implemented.');
        }}
        selected={0}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
