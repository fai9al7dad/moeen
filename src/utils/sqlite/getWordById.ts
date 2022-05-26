import { quranRow } from "./../../types/quran.types";
import { openQuranDB } from "./quranDB";
import { openDatabase } from "expo-sqlite";

export const getWordByID = (wordID: number): Promise<quranRow> => {
  return new Promise(async (resolve, reject) => {
    const db = await openQuranDB();

    db.transaction((tx) => {
      let query = `
        SELECT * FROM line
        join word
        on word.lineID = line.id
        where word.id = ?
        `;
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
