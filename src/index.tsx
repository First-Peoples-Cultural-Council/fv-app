import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { StrictMode } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import Dictionary from './componets/dictionary-page/dictionary-page';
import AlphabetView from './componets/alphabet-view/alphabet-view';
import DictionaryView from './componets/dictionary-view/dictionary-view';
import CategoryView from './componets/category-view/category-view';
import CategoriesView from './componets/categories-view/categories-view';
import Learn from './componets/learn/learn';
import StoriesView from './componets/stories-view/stories-view';
import SongsView from './componets/songs-view/songs-view';
import FlashcardsView from './componets/flashcards-view/flashcards-view';
import ProfileView from './componets/profile-view/profile-view';
import SettingsView from './componets/settings-view/settings-view';
import PageNotFound from './componets/common/page-not-found/page-not-found';

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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
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
