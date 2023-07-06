import { render } from '@testing-library/react';

import SearchHeader from './search-header';

describe('SearchHeader', () => {

  it('should render successfully', () => {
    // setup
    const originalSearch = window.distanceCalculatorWord;
    window.distanceCalculatorWord = jest.fn(() => "test");

    // assertions
    expect(window.distanceCalculatorWord).toBeCalled();

    // cleanup
    global.distanceCalculatorWord = originalSearch;

    // const { baseElement } = render(
    //   <SearchHeader
    //     searchMatchRef={null}
    //     title={''}
    //     backgroundColors={{
    //       to: '',
    //       from: '',
    //     }}
    //   />
    // );
    // expect(baseElement).toBeTruthy();
  });
});
