/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import IconMenu from './icon-menu';

describe('IconMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <IconMenu menuData={[]} srOnlyLabel={''} icon={undefined} />
    );
    expect(baseElement).toBeTruthy();
  });
});
