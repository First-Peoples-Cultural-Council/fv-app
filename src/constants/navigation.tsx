import { NavigationItem, SubNavItem } from '../components/common/data';

export const dictionarySubNavItems: SubNavItem[] = [
  {
    id: 'dictionary',
    path: 'dictionary',
    icon: 'fv-words',
    iconSize: 'text-2xl',
    title: 'Dictionary',
    colors: {
      to: 'to-color-words-light',
      from: 'from-color-words-dark',
      hoverText: 'hover:text-color-words-dark',
      activeText: 'text-color-words-dark',
      border: 'border-color-words-dark',
    },
    activePathMatches: [{ path: '' }], // Dictionary is the default page
  },
  {
    id: 'alphabet',
    path: 'alphabet',
    icon: 'fv-alphabet',
    iconSize: 'text-2xl',
    title: 'Alphabet',
    colors: {
      to: 'to-color-alphabet-light',
      from: 'from-color-alphabet-dark',
      hoverText: 'hover:text-color-alphabet-dark',
      activeText: 'text-color-alphabet-dark',
      border: 'border-color-alphabet-dark',
    },
  },
  {
    id: 'categories',
    path: 'categories',
    icon: 'fv-categories',
    iconSize: 'text-2xl',
    title: 'Categories',
    colors: {
      to: 'to-color-categories-light',
      from: 'from-color-categories-dark',
      hoverText: 'hover:text-color-categories-dark',
      activeText: 'text-color-categories-dark',
      border: 'border-color-categories-dark',
    },
    activePathMatches: [{ path: 'categories/:id' }],
  },
  {
    id: 'randomized',
    path: 'randomized',
    icon: 'fv-shuffle',
    iconSize: 'text-2xl',
    title: 'Random',
    colors: {
      to: 'to-color-shuffle-light',
      from: 'from-color-shuffle-dark',
      hoverText: 'hover:text-color-shuffle-dark',
      activeText: 'text-color-shuffle-dark',
      border: 'border-color-shuffle-dark',
    },
  },
];

export const learnSubNavItems: SubNavItem[] = [
  {
    id: 'stories',
    path: '/learn/stories',
    icon: 'fv-stories',
    iconSize: 'text-3xl',
    title: 'Stories',
    colors: {
      to: 'to-color-stories-light',
      from: 'from-color-stories-dark',
      hoverText: 'hover:text-color-stories-dark',
      activeText: 'text-color-stories-dark',
      border: 'border-color-stories-dark',
    },
    activePathMatches: [{ path: '/learn/stories' }, { path: '/learn' }], // Stories is the default page for 'learn'
  },
  {
    id: 'songs',
    path: '/learn/songs',
    icon: 'fv-songs',
    iconSize: 'text-4xl',
    title: 'Songs',
    colors: {
      to: 'to-color-songs-light',
      from: 'from-color-songs-dark',
      hoverText: 'hover:text-color-songs-dark',
      activeText: 'text-color-songs-dark',
      border: 'border-color-songs-dark',
    },
    activePathMatches: [{ path: '/learn/songs' }],
  },
  {
    id: 'flashcards',
    path: '/learn/flashcards',
    icon: 'fv-flashcard',
    iconSize: 'text-4xl',
    title: 'Flashcards',
    colors: {
      to: 'to-color-flashcards-light',
      from: 'from-color-flashcards-dark',
      hoverText: 'hover:text-color-flashcards-dark',
      activeText: 'text-color-flashcards-dark',
      border: 'border-color-flashcards-dark',
    },
    activePathMatches: [{ path: '/learn/flashcards' }],
  },
];

export const navItems: NavigationItem[] = [
  {
    id: 'dictionary',
    label: 'Dictionary',
    to: '/dictionary',
    icon: <i className="fv-dictionary" />,
  },
  {
    id: 'learn',
    label: 'Learn',
    to: '/learn',
    icon: <i className="fv-learning" />,
  },
  {
    id: 'bookmarks',
    label: 'Bookmarks',
    to: '/bookmarks',
    icon: <i className="fv-bookmark" />,
  },
];

export const extraNavItems: NavigationItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    to: '/settings',
    icon: <i className="fv-cog" />,
  },
  {
    id: 'about',
    label: 'About',
    to: '/about',
    icon: <i className="fv-info" />,
  },
];
