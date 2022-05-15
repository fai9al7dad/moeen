import * as SQLite from "expo-sqlite";

export const updateWordColor = (wordColor: string, wordID: number) => {
  const db = SQLite.openDatabase("quran.db");

  db.transaction(async (tx) => {
    let updateWordColor = `UPDATE word set color = ? where id = ?`;
    tx.executeSql(
      updateWordColor,
      [wordColor, wordID],
      (_, s) => {},
      (t: any, e: any): any => {
        console.log("error from updating", e);
      }
    );
  });
};
