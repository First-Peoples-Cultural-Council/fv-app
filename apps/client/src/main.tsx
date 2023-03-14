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
import AlphabetView from './app/alphabet-view/alphabet-view';
import WordsView from './app/words-view/words-view';
import PhrasesView from './app/phrases-view/phrases-view';
import CategoriesView from './app/categories-view/categories-view';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Dictionary />}>
          <Route index element={<AlphabetView />} />
          <Route path="words" element={<WordsView />} />
          <Route path="phrases" element={<PhrasesView />} />
          <Route path="categories" element={<CategoriesView />} />
        </Route>
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
