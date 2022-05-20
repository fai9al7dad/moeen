import { mistakesColor } from "./../../assets/conts/mistakes";
import { openDatabase } from "expo-sqlite";

export const getChapterMistakesAndWarnings = (
  wordColor: string,
  chapterCode
) => {
  return new Promise((resolve, reject) => {
    const db = openDatabase("quran.db");
    let type;
    if (wordColor === mistakesColor.mistake) {
      type = "mistakes";
    } else {
      type = "warnings";
    }
    db.transaction((tx) => {
      let query = `
                select count(*) as ${type} from word
                where color = ? and chapterCode = ?
              `;
      tx.executeSql(
        query,
        [wordColor, chapterCode],
        (_, s) => {
          let data = s.rows._array;
          resolve(data[0]);
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
