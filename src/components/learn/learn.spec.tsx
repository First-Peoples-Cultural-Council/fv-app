import React from 'react';
import { render } from '@testing-library/react';

import { LearnView } from './learn';
import { SearchHeader } from '../common/search-header/search-header';
import { BrowserRouter } from 'react-router-dom';

describe('LearnView', () => {
  const originalWindow = window;
  let myFunction: jest.SpyInstance<ReturnType<Required<any>[string]>, jest.ArgsType<Required<any>[string]>> = jest.fn()
  beforeEach(() => {
    myFunction = jest.spyOn(
      window as Window & typeof globalThis & { distanceCalculatorWord: any },
      'distanceCalculatorWord'
    );
  });

  afterEach(() => {
    window = originalWindow;
  });

  it('should render successfully', () => {
    const { baseElement } = render(<LearnView />, { wrapper: BrowserRouter });
    expect(baseElement).toBeTruthy();
  });
});
