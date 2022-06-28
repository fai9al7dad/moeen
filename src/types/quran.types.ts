export interface quranRow {
  audioUrl: string;
  chapterCode: string;
  charType: string;
  color: string;
  id: number;
  isBismillah?: any;
  isNewChapter: number;
  lineID: number;
  lineNumber: number;
  text: string;
  transliteration: string;
  verseNumber: string;
}

export interface quranArray {
  data: quranRow[];
}
