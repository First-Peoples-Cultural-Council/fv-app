import { render } from '@testing-library/react';

import ChooseALanguage from './choose-alanguage';

describe('ChooseALanguage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChooseALanguage />);
    expect(baseElement).toBeTruthy();
  });
});
