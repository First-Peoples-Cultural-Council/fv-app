import { render } from '@testing-library/react';

import Modal from './modal';

describe('Modal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Modal
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
        children={undefined}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
