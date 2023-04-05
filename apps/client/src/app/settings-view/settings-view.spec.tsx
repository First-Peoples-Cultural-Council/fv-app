import { render } from '@testing-library/react';

import SettingsView from './settings-view';

describe('SettingsView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SettingsView />);
    expect(baseElement).toBeTruthy();
  });
});
