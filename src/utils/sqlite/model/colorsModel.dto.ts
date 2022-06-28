export interface insertColorDto {
  wordID: number;
  color: string;
  chapterCode: string;
  pageNumber: number;
  verseNumber: number;
  sendRequest: boolean;
}

export interface deleteColorDto {
  wordID: number;
}

export interface getChapterMistakesAndWarningsDto {
  chapterCode: string;
  wordColor: string;
}

export interface getPagesMistakesAndWarningsDto {
  wordColor: string;
}

export interface colorsDto {
  id: number;
  wordID: number;
  color: string;
  chapterCode: string;
  pageNumber: number;
}
