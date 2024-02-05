import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { lazy, StrictMode } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

const Dictionary = lazy(
  () => import('./components/dictionary-page/dictionary-page')
);
const AlphabetView = lazy(
  () => import('./components/alphabet-view/alphabet-view')
);
const DictionaryView = lazy(
  () => import('./components/dictionary-view/dictionary-view')
);
const CategoryView = lazy(
  () => import('./components/category-view/category-view')
);
const CategoriesView = lazy(
  () => import('./components/categories-view/categories-view')
);
const Learn = lazy(() => import('./components/learn/learn'));
const StoriesView = lazy(
  () => import('./components/stories-view/stories-view')
);
const SongsView = lazy(() => import('./components/songs-view/songs-view'));
const FlashcardsView = lazy(
  () => import('./components/flashcards-view/flashcards-view')
);
const ProfileView = lazy(
  () => import('./components/profile-view/profile-view')
);
const RandomizedView = lazy(
  () => import('./components/randomized-view/randomized-view')
);
const SettingsView = lazy(
  () => import('./components/settings-view/settings-view')
);
const AboutView = lazy(() => import('./components/about-view/about-view'));
const PageNotFound = lazy(
  () => import('./components/common/page-not-found/page-not-found')
);
const SearchProvider = lazy(() => import('./components/search-provider'));

export const routesConfig = createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route path="/" element={<Dictionary />}>
        <Route path="/" element={<AlphabetView />} />
        <Route path="alphabet/:letter?" element={<AlphabetView />} />
        <Route path="dictionary" element={<DictionaryView />} />
        <Route path="categories/:id" element={<CategoryView />} />
        <Route path="categories" element={<CategoriesView />} />
        <Route path="randomized" element={<RandomizedView />} />
      </Route>
      <Route path="learn" element={<Learn />}>
        <Route path="stories" element={<StoriesView />} />
        <Route path="songs" element={<SongsView />} />
        <Route path="flashcards" element={<FlashcardsView />} />
      </Route>
      <Route path="/profile" element={<ProfileView />} />
      <Route path="/settings" element={<SettingsView />} />
      <Route path="/about" element={<AboutView />} />
    </Route>
    <Route path="*" element={<PageNotFound />} />
  </>
);

export const router = createBrowserRouter(routesConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
