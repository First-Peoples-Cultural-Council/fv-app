import { NavigationItem, SubNavItem } from 'components/common/data'

export const dictionarySubNavItems: SubNavItem[] = [
  {
    id: 'dictionary',
    path: 'dictionary',
    icon: 'fv-words',
    iconSize: 'text-2xl',
    title: 'Dictionary',
    colors: {
      to: 'to-word-500',
      from: 'from-word-700',
      hoverText: 'hover:text-word-700',
      activeText: 'text-word-700',
      border: 'border-word-700',
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
      to: 'to-song-500',
      from: 'from-song-700',
      hoverText: 'hover:text-song-700',
      activeText: 'text-song-700',
      border: 'border-song-700',
    },
  },
  {
    id: 'categories',
    path: 'categories',
    icon: 'fv-categories',
    iconSize: 'text-2xl',
    title: 'Categories',
    colors: {
      to: 'to-story-500',
      from: 'from-story-700',
      hoverText: 'hover:text-story-700',
      activeText: 'text-story-700',
      border: 'border-story-700',
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
      to: 'to-tertiaryA-500',
      from: 'from-tertiaryA-600',
      hoverText: 'hover:text-tertiaryA-600',
      activeText: 'text-tertiaryA-600',
      border: 'border-tertiaryA-600',
    },
  },
]

export const learnSubNavItems: SubNavItem[] = [
  {
    id: 'stories',
    path: '/learn/stories',
    icon: 'fv-stories',
    iconSize: 'text-3xl',
    title: 'Stories',
    colors: {
      to: 'to-story-500',
      from: 'from-story-700',
      hoverText: 'hover:text-story-700',
      activeText: 'text-story-700',
      border: 'border-story-700',
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
      to: 'to-song-500',
      from: 'from-song-700',
      hoverText: 'hover:text-song-700',
      activeText: 'text-song-700',
      border: 'border-song-700',
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
      to: 'to-tertiaryA-500',
      from: 'from-tertiaryA-600',
      hoverText: 'hover:text-tertiaryA-600',
      activeText: 'text-tertiaryA-600',
      border: 'border-tertiaryA-600',
    },
    activePathMatches: [{ path: '/learn/flashcards' }],
  },
]

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
]

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
]
