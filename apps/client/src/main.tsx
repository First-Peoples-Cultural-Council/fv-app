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
import ChooseALanguage from './app/choose-alanguage/choose-alanguage';
import Language from './app/language/language';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<ChooseALanguage />} />
        <Route path="/language" element={<Language />} />
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
