export interface quranRow {
  chapterCode: number;
  audioUrl: string;
  charType: string;
  color: string;
  hizbNumber: number;
  isBismillah?: any;
  isNewChapter: number;
  juzNumber: number;
  lineNumber: number;
  pageID: number;
  pageNumber: number;
  rubNumber: number;
  text: string;
  transliteration: string;
  verseNumber: number;
  wordID: number;
}

export interface quranArray {
  data: quranRow[];
}
