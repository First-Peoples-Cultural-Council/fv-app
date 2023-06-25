import { render } from '@testing-library/react';

import SearchHeader from './search-header';

describe('SearchHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SearchHeader
        searchMatchRef={null}
        title={''}
        backgroundColors={{
          to: '',
          from: '',
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
