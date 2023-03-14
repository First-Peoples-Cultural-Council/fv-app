import './registerServiceWorker.js';

import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';

import App from './app/app';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import { PageNotFound } from '@fv-app/common-components';
import Dictionary from './app/dictionary-page/dictionary-page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<div>Hi</div>} />
        <Route path="/dictionary" element={<Dictionary />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
