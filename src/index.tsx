import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

// FPCC
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ApiProvider } from './components/contexts/apiContext';
import { AudioProvider } from './components/contexts/audioContext';
// Components
import AboutView from './components/about-view/about-view';
import AlphabetView from './components/alphabet-view/alphabet-view';
import CategoryView from './components/category-view/category-view';
import CategoriesView from './components/categories-view/categories-view';
import Dictionary from './components/dictionary-page/dictionary-page';
import DictionaryView from './components/dictionary-view/dictionary-view';
import DictionaryEntryView from './components/dictionary-entry-view/dictionary-entry-view';
import ErrorPage from './components/error-page/error-page';
import FlashcardsView from './components/flashcards-view/flashcards-view';
import Learn from './components/learn/learn';
import PageNotFound from './components/page-not-found/page-not-found';
import ProfileView from './components/profile-view/profile-view';
import RandomizedView from './components/randomized-view/randomized-view';
import SettingsView from './components/settings-view/settings-view';
import SongsPage from './components/songs-page/songs-page';
import StoriesPage from './components/stories-page/stories-page';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route element={<Dictionary />} errorElement={<ErrorPage />}>
        <Route path="alphabet" element={<AlphabetView />} />
        <Route path="categories" element={<CategoriesView />} />
        <Route path="categories/:id" element={<CategoryView />} />
        <Route path="dictionary" element={<DictionaryView />} />
        <Route path="dictionary/:id" element={<DictionaryEntryView />} />
        <Route path="randomized" element={<RandomizedView />} />
        <Route index element={<DictionaryView />} />
      </Route>
      <Route path="learn" element={<Learn />} errorElement={<ErrorPage />}>
        <Route path="stories/*" element={<StoriesPage />} />
        <Route path="songs/*" element={<SongsPage />} />
        <Route path="flashcards" element={<FlashcardsView />} />
        <Route index element={<StoriesPage />} />
      </Route>
      <Route path="bookmarks" element={<ProfileView />} />
      <Route path="settings" element={<SettingsView />} />
      <Route path="about" element={<AboutView />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ApiProvider>
      <AudioProvider>
        <RouterProvider router={router} />
      </AudioProvider>
    </ApiProvider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
