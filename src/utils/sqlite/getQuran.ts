import { mistakesColor } from "./../../assets/conts/mistakes";
import { getPageMistakesAndWarnings } from "./getPageMistakesAndWarnings";
import { useState } from "react";
import { openDatabase } from "expo-sqlite";

export const getQuran = () => {
  // const PAGE_SIZE = 1; // size of one page in the UI
  // const PAGE_BUFFER = 10; // extra rows to load on either side
  // const window = PAGE_SIZE + 2 * PAGE_BUFFER;
  // const startIx = parseInt(scrollIndex) - PAGE_BUFFER;

  return new Promise((resolve, reject) => {
    const initializePagesArray = () => {
      let pages: any = [];
      // initialze lines
      // make less because last surah returns empty array
      for (let i = 0; i <= 603; i++) {
        pages.push([]);
      }
      return pages;
    };
    let pages = initializePagesArray();

    const db = openDatabase("quran.db");
    db.readTransaction(async (tx) => {
      // for (let i = 0; i < chunks.length; i++) {
      // let curChunk = chunks[i];
      let sqlQuery = `
                select 
                page.id as pageID, page.pageNumber, page.rubNumber, page.hizbNumber, page.juzNumber,
                word.text,word.lineNumber, word.transliteration,word.isBismillah,word.isNewChapter,word.color,word.chapterCode,word.id as wordID,word.charType
                from page
                inner join line 
                on line.pageID = page.id
                inner join word
                on word.lineID = line.id
                order by word.lineNumber
              `;

      await tx.executeSql(
        sqlQuery,
        [],
        async (_, s) => {
          const rows = s.rows._array;

          for (let i = 0; i < rows.length; i++) {
            pages[rows[i]?.pageNumber - 1].push(rows[i]);
          }
          let mistakes: any = await getPageMistakesAndWarnings(
            mistakesColor.mistake
          );
          for (let i = 0; i < mistakes.length; i++) {
            pages[mistakes[i].pageNumber - 1][0]["mistakes"] =
              mistakes[i].mistakes;
          }
          let warnings: any = await getPageMistakesAndWarnings(
            mistakesColor.warning
          );
          for (let i = 0; i < warnings.length; i++) {
            pages[warnings[i].pageNumber - 1][0]["warnings"] =
              warnings[i].warnings;
          }

          resolve(pages);
        },
        (t: any, e: any): any => {
          reject(e);

          console.log(e);
        }
      );
    });
    // }
  });
};
