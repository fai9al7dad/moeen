import { action, makeObservable, observable } from "mobx";
import axios from "axios";

class Store {
  // state
  currentWerdID = 0;
  isWerd = false;
  werdID = 0;
  duoID = 0;
  username = "";
  mistakesCounter = 0;
  warningsCounter = 0;
  counter = 0;

  //computed
  constructor() {
    makeObservable(this, {
      isWerd: observable,
      werdID: observable,
      currentWerdID: observable,
      duoID: observable,
      username: observable,
      mistakesCounter: observable,
      warningsCounter: observable,
      startWerd: action,
      finishWerd: action,
      updateMistakesOrWarningsCounter: action,
    });
  }
  // actions
  startWerd(werdID: number, duoID: number, username: string) {
    this.isWerd = true;
    this.werdID = werdID;
    this.duoID = duoID;
    this.username = username;
  }
  finishWerd() {
    this.isWerd = false;
    this.werdID = 0;
    this.duoID = 0;
    this.username = "";
    this.mistakesCounter = 0;
    this.warningsCounter = 0;
  }
  updateMistakesOrWarningsCounter(type: string, wordID: number) {
    switch (type) {
      case "warning":
        this.warningsCounter++;
        break;
      case "mistake":
        this.warningsCounter--;
        this.mistakesCounter++;
        break;
      case "revert":
        this.mistakesCounter--;
    }
    let payload = {
      wordID: wordID.toString(),
      type: type,
      werdID: this.werdID.toString(),
    };
    setTimeout(async () => {
      try {
        let res = await axios.post("/api/highlight/add", payload);
      } catch (e: any) {
        console.log(e.response.data);
      }
    }, 2000);
  }
}
const store = new Store();

export default store;
