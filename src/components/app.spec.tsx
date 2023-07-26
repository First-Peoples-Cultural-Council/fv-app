import App from './app';
import { renderWithProviders } from '../testingUtils/renderWithProviders';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(['/']);

    expect(baseElement).toBeTruthy();
  });
});
