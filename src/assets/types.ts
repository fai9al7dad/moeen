export interface WordType {
  id: number;
  color: string;
  text?: any;
  lineID: number;
  lineNumber: number;
  audioUrl?: any;
  chapterCode: string;
  isNewChapter: boolean;
  isBismillah?: any;
  transliteration?: any;
  charType?: any;
  verseNumber?: any;
}

export interface LineType {
  id: number;
  pageID: number;
  words: WordType[];
}

export interface PageType {
  id: number;
  pageNumber: number;
  chapterCode: string;
  hizbNumber: number;
  juz: number;
  lines: LineType[];
}
export type RootStackParamList = {
  Quran: undefined;
  SelectSurah: undefined;
  Register: undefined;
  Login: undefined;
  SelectDuo: undefined;
  SearchDuo: undefined;
  FinishWerd: undefined;
  WerdMeta: undefined;
  ViewWerdsHighlights: {
    duoID: number;
    username: string;
  };
  ViewWirds: {
    duoID: number;
    username: string;
  };
};
