import { mistakesColor } from "./../../assets/conts/mistakes";
import * as SQLite from "expo-sqlite";

export const getPageMistakesAndWarnings = (wordColor: string) => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("quran.db");
    let type;
    if (wordColor === mistakesColor.mistake) {
      type = "mistakes";
    } else {
      type = "warnings";
    }
    db.transaction((tx) => {
      let query = `
                select count(*) as ${type}, page.pageNumber from page
                join line 
                on line.pageID = page.id
                join word
                on word.lineID = line.id
                where
                word.color = ?
                group by page.pageNumber
              `;
      tx.executeSql(
        query,
        [wordColor],
        (_, s) => {
          let data = s.rows._array;
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
