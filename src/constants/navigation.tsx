import { FaBookOpen, FaMusic, FaBookmark, FaGear, FaDownload, FaInfo, FaShuffle } from 'react-icons/fa6'
import { TbPlayCardStarFilled } from 'react-icons/tb'
import { BiSolidCategory } from 'react-icons/bi'

// FPCC
import { NavigationItem, SubNavItem } from 'components/common/data'
import AlphabetIcon from 'components/common/custom-icons/alphabet-icon'
import LearnIcon from 'components/common/custom-icons/learn-icon'
import DictionaryIcon from 'components/common/custom-icons/dictionary-icon'

export const dictionarySubNavItems: SubNavItem[] = [
  {
    id: 'dictionary',
    path: 'dictionary',
    icon: DictionaryIcon,
    iconSize: 'text-3xl',
    title: 'Dictionary',
    colors: {
      to: 'to-word-500',
      from: 'from-word-700',
      activeText: 'text-word-700',
      border: 'border-word-700',
    },
    activePathMatches: [{ path: '' }], // Dictionary is the default page
  },
  {
    id: 'alphabet',
    path: 'alphabet',
    icon: AlphabetIcon,
    iconSize: 'text-3xl',
    title: 'Alphabet',
    colors: {
      to: 'to-song-500',
      from: 'from-song-700',
      activeText: 'text-song-700',
      border: 'border-song-700',
    },
  },
  {
    id: 'categories',
    path: 'categories',
    icon: BiSolidCategory,
    iconSize: 'text-3xl',
    title: 'Categories',
    colors: {
      to: 'to-story-500',
      from: 'from-story-700',
      activeText: 'text-story-700',
      border: 'border-story-700',
    },
    activePathMatches: [{ path: 'categories/:id' }],
  },
  {
    id: 'randomized',
    path: 'randomized',
    icon: FaShuffle,
    iconSize: 'text-3xl',
    title: 'Random',
    colors: {
      to: 'to-tertiaryA-500',
      from: 'from-tertiaryA-600',
      activeText: 'text-tertiaryA-600',
      border: 'border-tertiaryA-600',
    },
  },
]

export const learnSubNavItems: SubNavItem[] = [
  {
    id: 'stories',
    path: '/learn/stories',
    icon: FaBookOpen,
    iconSize: 'text-3xl',
    title: 'Stories',
    colors: {
      to: 'to-story-500',
      from: 'from-story-700',
      activeText: 'text-story-700',
      border: 'border-story-700',
    },
    activePathMatches: [{ path: '/learn/stories' }, { path: '/learn' }], // Stories is the default page for 'learn'
  },
  {
    id: 'songs',
    path: '/learn/songs',
    icon: FaMusic,
    iconSize: 'text-3xl',
    title: 'Songs',
    colors: {
      to: 'to-song-500',
      from: 'from-song-700',
      activeText: 'text-song-700',
      border: 'border-song-700',
    },
    activePathMatches: [{ path: '/learn/songs' }],
  },
  {
    id: 'flashcards',
    path: '/learn/flashcards',
    icon: TbPlayCardStarFilled,
    iconSize: 'text-4xl',
    title: 'Flashcards',
    colors: {
      to: 'to-tertiaryA-500',
      from: 'from-tertiaryA-600',
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
    icon: DictionaryIcon,
  },
  {
    id: 'learn',
    label: 'Learn',
    to: '/learn',
    icon: LearnIcon,
  },
  {
    id: 'bookmarks',
    label: 'Bookmarks',
    to: '/bookmarks',
    icon: FaBookmark,
  },
]

export const extraNavItems: NavigationItem[] = [
  {
    id: 'install',
    label: 'Installation',
    to: '/install',
    icon: FaDownload,
  },
  {
    id: 'settings',
    label: 'Settings',
    to: '/settings',
    icon: FaGear,
  },
  {
    id: 'about',
    label: 'About',
    to: '/about',
    icon: FaInfo,
  },
]
