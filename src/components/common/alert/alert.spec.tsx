/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import Alert from './alert';

describe('Alert', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Alert
        type={'error'}
        message={undefined}
        showDismissButton={false}
        showAlert={false}
        dismissAlert={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
