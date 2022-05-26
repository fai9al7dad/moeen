export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  ayahs: Ayah[];
}

export interface Quran {
  surahs: Surah[];
}

export type RootStackParamList = {
  Quran: undefined;
  SelectSurah: undefined;
  Register: undefined;
  Login: undefined;
  SelectDuo: undefined;
  SearchDuo: undefined;
  FinishWerd: undefined;
  ViewWerdsHighlights: {
    duoID: number;
    username: string;
  };
  ViewWirds: {
    duoID: number;
    username: string;
  };
};
