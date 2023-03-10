import { ButtonTypeEnum, StandardButtonButtonTypeEnum } from './enums';

export type SelectOption = {
  id: string;
  label: string;
};

export type BasicMenuItem = {
  id: string;
  type: ButtonTypeEnum;
  label: string;
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
  optional: {
    [key : string] : string
  }[] | null;
  compare_form: string;
  sort_form: string;
  sorting_form: number[];
}

export type FvAudio = {
  speaker: string | null;
  filename: string;
}

