import { mistakesColor } from "./../../assets/conts/mistakes";
import { openQuranDB } from "./quranDB";

export const getChapterMistakesAndWarnings = (
  wordColor: string,
  chapterCode: string
) => {
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
        (t: any, e: any): any => {
          console.log("error from chapter E", e);

          reject(undefined);
        }
      );
    });
  });
};
