import { ButtonTypeEnum, StandardButtonButtonTypeEnum } from './enums';
import { ReactNode } from 'react';

export type SelectOption = {
  id: string;
  label: string;
};

export type BasicMenuItem = {
  id: string;
  type: ButtonTypeEnum;
  label: string;
  icon?: ReactNode;
};

export type ButtonMenuItem = {
  type: ButtonTypeEnum.button;
  buttonType: StandardButtonButtonTypeEnum;
};

export type ButtonButtonMenuItem = {
  type: ButtonTypeEnum.button;
  buttonType: StandardButtonButtonTypeEnum.button;
  onClick: () => void;
};

export type SubmitButtonMenuItem = {
  type: ButtonTypeEnum.button;
  buttonType: StandardButtonButtonTypeEnum.submit;
};

export type LinkMenuItem = {
  type: ButtonTypeEnum.Link;
  to: string;
};

export type AnchorMenuItem = {
  type: ButtonTypeEnum.a;
  href: string;
};

export type MenuItemType = BasicMenuItem &
  (ButtonButtonMenuItem | SubmitButtonMenuItem | LinkMenuItem | AnchorMenuItem);

export type MenuSection = {
  id: string;
  menuItems: MenuItemType[];
};

export type Dialect = {
  id: string;
  image?: string;
  label: string;
};

export type Language = {
  id: string;
  image?: string;
  label: string;
  color: string;
  dialects?: Dialect[];
};

export type FvWord = {
  source: string;
  entryID: string;
  word: string;
  definition: string;
  audio: FvAudio[];
  img: string;
  theme: string;
  secondary_theme: string | null;
  optional:
    | {
        [key: string]: string;
      }[]
    | null;
  compare_form: string;
  sort_form: string;
  sorting_form: number[];
};

export type FvAudio = {
  speaker: string | null;
  filename: string;
};

export type SubNavItem = {
  id: string;
  path: string;
  activePathMatches?: { path: string }[];
  icon: string;
  iconSize: string;
  title: string;
  colors: {
    to: string;
    from: string;
    hoverText: string;
    activeText: string;
    border: string;
  };
};

export type FvCategory = {
  id: string;
  name: string;
  icon: string | null;
  parent: string | null;
};

export type FvLetter = {
  letter: string;
  audio: FvAudio[];
  examples: string[];
  notes: string;
  order: number;
};

export type NavigationItem = {
  id: string;
  to: string;
  label: string;
  icon?: ReactNode;
};

export type Flashcard = {
  type: string;
  frontWord: string | null;
  backWord: string;
  audio: FvAudio[] | null;
};

export type Bookmark = {
  id: string;
  type: string;
  name: string;
  definition: string;
  hasAudio: boolean;
  url: string;
  timestamp: Date;
};

export type DeleteListType = {
  id: string;
  display: ReactNode;
};

export type FVSong = {
  id: string;
  type: string;
  title: string;
  titleTranslation: string | null;
  coverVisual: FvMedia | null;
  introduction: FVContent | null;
  lyrics: FVContent | null;
  author: string | null;
  images: FvMedia[];
  audio: FvMedia[];
  videos: FvMedia[];
};

export type FVPage = {
  order: number;
  content: FVContent;
  audio: FvMedia[];
  videos: FvMedia[];
  images: FvMedia[];
};

export type FVContent = {
  text: string;
  translation: string;
};

export type FVStory = {
  id: string;
  title: string | null;
  titleTranslation: string | null;
  author_name: string | null;
  coverVisual: FvMedia | null;
  intro: FVContent | null;
  acknowledgements: string[];
  notes: string[];
  audio: FvMedia[];
  videos: FvMedia[];
  images: FvMedia[];
  pages: FVPage[];
};

export type FvMedia = {
  id: string;
  title: string;
  file: string;
  mimetype: string;
};
