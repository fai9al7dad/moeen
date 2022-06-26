export interface insertColorDto {
  wordID: number;
  color: string;
  chapterCode: string;
  pageNumber: number;
  verseNumber: number;
}

export interface deleteColorDto {
  wordID: number;
}

export interface tempColorsDto {
  id: number;
  wordID: number;
  color: string;
  chapterCode: string;
  pageNumber: number;
}
