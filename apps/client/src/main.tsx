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
import DictionaryView from './app/dictionary-view/dictionary-view';
import CategoriesView from './app/categories-view/categories-view';
import CategoryView from './app/category-view/category-view';
import LearnView from './app/learn-view/learn-view';
import ProfileView from './app/profile-view/profile-view';
import SettingsView from './app/settings-view/settings-view';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Dictionary />}>
          <Route path="alphabet" element={<AlphabetView />} />
          <Route path="dictionary" element={<DictionaryView />} />
          <Route path="categories/:id" element={<CategoryView />} />
          <Route path="categories" element={<CategoriesView />} />
          <Route path="learn" element={<LearnView />} />
          <Route path="profile" element={<ProfileView />} />
          <Route path="settings" element={<SettingsView />} />
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
