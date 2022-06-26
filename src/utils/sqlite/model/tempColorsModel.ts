import * as SQLite from "expo-sqlite";
import { deleteColorDto, insertColorDto } from "./tempColorsModel.dto";

const TABLES = {
  COLORS_WORDS_MAP: "tempColorsWordsMap",
};

class TempColorsModel {
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
  insertColor({
    wordID,
    color,
    chapterCode,
    pageNumber,
    verseNumber,
  }: insertColorDto) {
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

      this._db.transaction((tx) => {
        tx.executeSql(
          searchQuery,
          [wordID],
          (_, s) => {
            const rows = s.rows._array;
            tx.executeSql(
              rows.length > 0 ? updateQuery : insertQuery,
              [],
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
    console.log("error TempColorsModel", e);
  }
}

const tempColorsModel = new TempColorsModel();

export default tempColorsModel;
