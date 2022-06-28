import { quranRow } from "./../../types/quran.types";
import { openQuranDB } from "./quranDB";
import { openDatabase } from "expo-sqlite";

export const getRowById = (table: string, id: number): any => {
  return new Promise(async (resolve, reject) => {
    const db = await openQuranDB();

    db.transaction((tx) => {
      let query = `SELECT * FROM ${table} where id = ?`;
      tx.executeSql(
        query,
        [id],
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
