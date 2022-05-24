import { openQuranDB } from "./quranDB";
import { openDatabase } from "expo-sqlite";
import { mistakesColor } from "./../../assets/conts/mistakes";

export const getPageMistakesAndWarnings = (wordColor: string) => {
  return new Promise(async (resolve, reject) => {
    let type;
    if (wordColor === mistakesColor.mistake) {
      type = "mistakes";
    } else {
      type = "warnings";
    }
    const db = await openQuranDB();
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
        (t: any, e: any): any => {
          console.log("from page mistakes", e);

          reject(undefined);
        }
      );
    });
  });
};
