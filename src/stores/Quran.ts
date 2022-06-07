import { getQuranWerd } from "./../utils/sqlite/getQuranWerd";
import { mistakesColor } from "./../assets/conts/mistakes";
import { updateWordColor } from "./../utils/sqlite/updateWordColor";
import { DataProvider } from "recyclerlistview";
import QURAN from "../assets/json/Quran.json";
import {
  observable,
  computed,
  action,
  makeObservable,
  runInAction,
} from "mobx";
import { getQuran } from "../utils/sqlite/getQuran";
import colorsModel from "../utils/sqlite/model/colorsModel";
class Quran {
  // state
  dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
  });

  counter = 0;

  wordsColorsMistakes = [];

  //computed
  get quranData() {
    return this.dataProvider.getAllData();
  }
  constructor() {
    makeObservable(this, {
      dataProvider: observable,
      counter: observable,
      wordsColorsMistakes: observable,
      quranData: computed,
      initDataProvider: action,
      fillWordsColorsMistakes: action,
      updateMistakesCounter: action,
      updateCounter: action,
    });
  }
  // actions

  initDataProvider = async ({ isClone }) => {
    // let quran: any = await getQuran();

    let data: any = new DataProvider((r1, r2) => {
      return r1 !== r2;
    }).cloneWithRows(QURAN.pages);

    let pageMistakes: any = await colorsModel.getPagesMistakesAndWarnings(
      mistakesColor.mistake
    );
    let pageWarnings: any = await colorsModel.getPagesMistakesAndWarnings(
      mistakesColor.warning
    );
    for (let i = 0; i < pageMistakes.length; i++) {
      if (pageMistakes[i]?.mistakes > 0) {
        data._data[pageMistakes[i].pageNumber - 1]["mistakes"] = isClone
          ? 0
          : pageMistakes[i]?.mistakes;
      }
    }
    for (let i = 0; i < pageWarnings.length; i++) {
      if (pageWarnings[i]?.warnings > 0) {
        data._data[pageWarnings[i].pageNumber - 1]["warnings"] = isClone
          ? 0
          : pageWarnings[i]?.warnings;
      }
    }
    runInAction(() => {
      this.dataProvider = data;
    });
  };

  fillWordsColorsMistakes(data) {
    this.wordsColorsMistakes = data;
  }

  updateCounter() {
    this.counter++;
  }
  updateMistakesCounter = (
    pageNumber: number,
    type: string,
    wordID: number,
    wordIndex: number,
    lineNumber: number,
    newColor: string
  ) => {
    switch (type) {
      case "warning":
        this.quranData[pageNumber - 1].lines[lineNumber - 1].words[
          wordIndex
        ].color = mistakesColor.warning;
        this.quranData[pageNumber - 1].warnings
          ? this.quranData[pageNumber - 1].warnings++
          : (this.quranData[pageNumber - 1].warnings = 1);
        break;
      case "mistake":
        this.quranData[pageNumber - 1].lines[lineNumber - 1].words[
          wordIndex
        ].color = mistakesColor.mistake;

        this.quranData[pageNumber - 1].warnings--;
        this.quranData[pageNumber - 1].mistakes
          ? this.quranData[pageNumber - 1].mistakes++
          : (this.quranData[pageNumber - 1].mistakes = 1);
        break;
      case "revert":
        this.quranData[pageNumber - 1].lines[lineNumber - 1].words[
          wordIndex
        ].color = mistakesColor.default;

        this.quranData[pageNumber - 1].mistakes--;
    }
    // here was updateQuran function
    // counter update is required, to rerender header. to fix later
    this.counter++;
  };
}
const quran = new Quran();

export default quran;
