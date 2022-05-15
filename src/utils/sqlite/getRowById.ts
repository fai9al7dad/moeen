import * as SQLite from "expo-sqlite";

export const getRowById = (table: string, wordID: number) => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("quran.db");
    db.transaction((tx) => {
      let query = `SELECT * FROM ${table} where id = ?`;
      tx.executeSql(
        query,
        [wordID],
        (_, s) => {
          let data = s.rows._array[0];
          resolve(data);
          // console.log("finished query");
        },
        (t: any, e: any) => {
          reject(undefined);
          throw new Error(e);
        }
      );
    });
  });
};
