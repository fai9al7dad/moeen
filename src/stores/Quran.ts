import { mistakesColor } from "./../assets/conts/mistakes";
import { updateWordColor } from "./../utils/sqlite/updateWordColor";
import { DataProvider } from "recyclerlistview";
import {
  observable,
  computed,
  action,
  makeObservable,
  runInAction,
} from "mobx";
import { getQuran } from "../utils/sqlite/getQuran";
class Quran {
  // state
  dataProvider = new DataProvider((r1, r2) => {
    return r1[0].wordID !== r2[0].wordID;
  });

  counter = 0;
  //computed
  get quranData() {
    return this.dataProvider.getAllData();
  }
  constructor() {
    makeObservable(this, {
      dataProvider: observable,
      counter: observable,
      initDataProvider: action,
      updateMistakesCounter: action,
      updateCounter: action,
      quranData: computed,
    });
  }
  // actions

  initDataProvider = async () => {
    let quran: any = await getQuran();
    let data = new DataProvider((r1, r2) => {
      return r1[0].wordID !== r2[0].wordID;
    }).cloneWithRows(quran);
    runInAction(() => {
      this.dataProvider = data;
    });
  };
  updateCounter() {
    this.counter++;
  }
  updateMistakesCounter = (
    pageNumber: number,
    type: string,
    wordID: number,
    wordIndex: number,
    newColor: string
  ) => {
    switch (type) {
      case "warning":
        this.quranData[pageNumber - 1][wordIndex].color = mistakesColor.warning;
        this.quranData[pageNumber - 1][0].warnings
          ? this.quranData[pageNumber - 1][0].warnings++
          : (this.quranData[pageNumber - 1][0].warnings = 1);
        break;
      case "mistake":
        this.quranData[pageNumber - 1][wordIndex].color = mistakesColor.mistake;

        this.quranData[pageNumber - 1][0].warnings--;
        this.quranData[pageNumber - 1][0].mistakes
          ? this.quranData[pageNumber - 1][0].mistakes++
          : (this.quranData[pageNumber - 1][0].mistakes = 1);
        break;
      case "revert":
        this.quranData[pageNumber - 1][wordIndex].color = mistakesColor.default;

        this.quranData[pageNumber - 1][0].mistakes--;
    }
    // here was updateQuran function
    // counter update is required, to rerender header. to fix later
    this.counter++;
  };
}
const quran = new Quran();

export default quran;
