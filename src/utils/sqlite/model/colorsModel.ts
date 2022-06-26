import { mistakesColor } from "./../../../assets/conts/mistakes";
import * as SQLite from "expo-sqlite";
import {
  deleteColorDto,
  getChapterMistakesAndWarningsDto,
  getPagesMistakesAndWarningsDto,
  insertColorDto,
} from "./colorsModel.dto";
import axios from "axios";
import tempColorsModel from "./tempColorsModel";

const TABLES = {
  COLORS_WORDS_MAP: "colorsWordsMap",
};

export class ColorsModel {
  private _db;
  constructor() {
    this._db = SQLite.openDatabase("colors.db");
  }

  createTable() {
    return new Promise(async (resolve, reject) => {
      let query = `create table if not exists
               ${TABLES.COLORS_WORDS_MAP} (
                   id INTEGER PRIMARY KEY NOT NULL,
                   wordID INTEGER NOT NULL,
                   color TEXT NOT NULL,
                   pageNumber INTEGER NOT NULL,
                   verseNumber INTEGER NOT NULL,
                   chapterCode TEXT NOT NULL
                  );`;
      await this._db.transaction((tx) => {
        tx.executeSql(
          query,
          [],
          (_, s) => {
            resolve("created success");
          },
          this.errorCB
        );
      });
    });
  }

  alterTable() {
    return new Promise(async (resolve, reject) => {
      let query = `ALTER TABLE ${TABLES.COLORS_WORDS_MAP}
            ADD verseNumber INTEGER
      `;
      await this._db.transaction((tx) => {
        tx.executeSql(
          query,
          [],
          (_, s) => {
            resolve("created success");
          },
          this.errorCB
        );
      });
    });
  }
  getAllWords() {
    return new Promise(async (resolve, reject) => {
      let query = `select * from ${TABLES.COLORS_WORDS_MAP}`;
      await this._db.transaction((tx) => {
        return tx.executeSql(
          query,
          [],
          (_, s) => {
            const rows = s.rows._array;
            resolve(rows);
          },
          this.errorCB
        );
      });
    });
  }

  insertColor({
    wordID,
    color,
    chapterCode,
    pageNumber,
    verseNumber,
  }: insertColorDto) {
    // checks for word in table
    // if exist update it, else insert color
    // send request to online backend
    // if fail.. might be due to no internet connection or other
    // add to tempColor table

    if (color === "black") {
      this.deleteColor({ wordID });
    }
    return new Promise(async (resolve, reject) => {
      let searchQuery = `
          select * from ${TABLES.COLORS_WORDS_MAP}
          where wordID = ?
        `;
      let insertQuery = `
          insert into ${TABLES.COLORS_WORDS_MAP}
          (color,wordID,chapterCode,pageNumber,verseNumber)
          values
          ('${color}',${wordID},'${chapterCode}',${pageNumber},${verseNumber})
        `;
      let updateQuery = `
          UPDATE ${TABLES.COLORS_WORDS_MAP}
          set color = '${color}'
          where wordID = ${wordID}
        `;

      // offline
      this._db.transaction((tx) => {
        tx.executeSql(
          searchQuery,
          [wordID],
          (_, s) => {
            const rows = s.rows._array;
            tx.executeSql(
              rows.length > 0 ? updateQuery : insertQuery,
              [],
              // [color, wordID, chapterCode, pageNumber],
              (_, s) => {
                const rows = s.rows._array;

                resolve(rows);
              },
              this.errorCB
            );
          },
          this.errorCB
        );
      });

      // online
      try {
        switch (color) {
          case mistakesColor.default:
            await axios.post("/api/highlight/add", {
              type: "revert",
              wordID: wordID,
            });

            break;
          case mistakesColor.warning:
            await axios.post("/api/highlight/add", {
              type: "warning",
              wordID: wordID,
            });
            break;
          case mistakesColor.mistake:
            await axios.post("/api/highlight/add", {
              type: "mistake",
              wordID: wordID,
            });
            break;
        }
      } catch (e: any) {
        console.log(
          "error from highlight/add endpoint... adding to temp colors ",
          e.response.data
        );
        // To test
        // Try to add without internet
        // then check tempColors
        // ------------
        // Try to add with internet, but logged off
        // then check tempColors
        // ------------
        // what should be added here is every request that doesnot have a token.. either no network request, or network but not logged in
        tempColorsModel.insertColor({
          wordID: wordID,
          color: color,
          chapterCode: chapterCode,
          pageNumber: pageNumber,
          verseNumber: verseNumber,
        });
      }
    });
  }

  async getChapterMistakesAndWarnings({
    wordColor,
    chapterCode,
  }: getChapterMistakesAndWarningsDto) {
    let type = "";
    if (wordColor === mistakesColor.mistake) {
      type = "mistakes";
    } else {
      type = "warnings";
    }
    return new Promise(async (resolve, reject) => {
      let query = `
         select count(*) as ${type} from ${TABLES.COLORS_WORDS_MAP}
        where color = ? and chapterCode = ?
        `;
      await this._db.transaction((tx) => {
        return tx.executeSql(
          query,
          [wordColor, chapterCode],
          (_, s) => {
            const rows = s.rows._array;
            resolve(rows);
          },
          this.errorCB
        );
      });
    });
  }
  async getPagesMistakesAndWarnings(wordColor) {
    return new Promise(async (resolve, reject) => {
      let type = "";
      if (wordColor === mistakesColor.mistake) {
        type = "mistakes";
      } else {
        type = "warnings";
      }
      let query = `
         select pageNumber,count(*) as ${type} from ${TABLES.COLORS_WORDS_MAP}
        where color = ?
        group by pageNumber
        `;
      await this._db.transaction((tx) => {
        return tx.executeSql(
          query,
          [wordColor],
          (_, s) => {
            const rows = s.rows._array;
            resolve(rows);
          },
          this.errorCB
        );
      });
    });
  }
  deleteColor({ wordID }: deleteColorDto) {
    return new Promise(async (resolve, reject) => {
      let query = `
          DELETE FROM ${TABLES.COLORS_WORDS_MAP}
          where wordID = ?
        `;
      await this._db.transaction((tx) => {
        return tx.executeSql(
          query,
          [wordID],
          (_, s) => {
            const rows = s.rows._array;
            resolve(rows);
          },
          this.errorCB
        );
      });
    });
  }

  deleteAllColors() {
    return new Promise(async (resolve, reject) => {
      let query = `
          DELETE FROM ${TABLES.COLORS_WORDS_MAP}
        `;
      await this._db.transaction((tx) => {
        return tx.executeSql(
          query,
          [],
          (_, s) => {
            const rows = s.rows._array;
            resolve(rows);
          },
          this.errorCB
        );
      });
    });
  }
  errorCB(_, e) {
    console.log("error ColorsModel", e);
  }
}

const colorsModel = new ColorsModel();

export default colorsModel;
