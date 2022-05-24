import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

export const openQuranDB = async () => {
  const dbName = "quran-v2.db";

  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
      .exists
  ) {
    // console.log(" directory sqlite does not exiist");

    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite"
    );
  }
  if (
    !(
      await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + `SQLite/${dbName}`
      )
    ).exists
  ) {
    // console.log(`${dbName} does not exisit... creating now`);

    await FileSystem.downloadAsync(
      Asset.fromModule(require("../../assets/db/quran-v2.db")).uri,
      FileSystem.documentDirectory + `SQLite/${dbName}`
    );
    // console.log(`created ${dbName}`);
    // console.log(`calling db`);

    const db = SQLite.openDatabase(dbName);
    return db;
  } else {
    // console.log(` ${dbName} already exists`);

    const db = SQLite.openDatabase(dbName);
    return db;
  }
};
