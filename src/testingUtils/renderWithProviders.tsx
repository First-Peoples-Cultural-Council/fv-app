import { render } from '@testing-library/react';
import SearchProvider from '../components/search-provider';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routesConfig } from '../index';

export const renderWithProviders = (initialEntries: string[]) => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries,
  });

  return render(
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  );
}
