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
import Learn from './app/learn/learn';
import ProfileView from './app/profile-view/profile-view';
import SettingsView from './app/settings-view/settings-view';
import StoriesView from './app/stories-view/stories-view';
import SongsView from './app/songs-view/songs-view';
import FlashcardsView from './app/flashcards-view/flashcards-view';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Dictionary />}>
          <Route path="alphabet" element={<AlphabetView />} />
          <Route path="dictionary" element={<DictionaryView />} />
          <Route path="categories/:id" element={<CategoryView />} />
          <Route path="categories" element={<CategoriesView />} />
        </Route>
        <Route path="/" element={<Learn />} >
          <Route path="stories" element={<StoriesView />} />
          <Route path="songs" element={<SongsView />} />
          <Route path="flashcards" element={<FlashcardsView />} />
        </Route>
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/settings" element={<SettingsView />} />

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
