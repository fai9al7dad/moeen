import { openQuranDB } from "./quranDB";

export const updateWordColor = async (wordColor: string, wordID: number) => {
  const db = await openQuranDB();

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
